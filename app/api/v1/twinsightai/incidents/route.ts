import { NextResponse } from "next/server";
import { getContainer, cleanDocument } from "@/lib/cosmos";

const {
  INCIDENTS_DB_NAME,
  INCIDENTS_DB_CONTAINER_NAME,
} = process.env;

const INCIDENTS_PARTITION_KEY = "/incidentNo";
const INCIDENTS_UNIQUE_KEYS = ["/incidentNo", "/ciName", "/type"];

const partitionKeyName = INCIDENTS_PARTITION_KEY.replace("/", "");

async function getIncidentsContainer() {
  return await getContainer(INCIDENTS_DB_NAME!, INCIDENTS_DB_CONTAINER_NAME!, INCIDENTS_PARTITION_KEY, INCIDENTS_UNIQUE_KEYS);
}

// Retrieve incidents by ciName and/or incidentNo
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const ciName = url.searchParams.get("ciName");
    const incidentNo = url.searchParams.get("incidentNo");

    const container = await getIncidentsContainer();

    let query = "SELECT * FROM c";
    const parameters: any[] = [];
    const filters: string[] = [];
    filters.push("c.type = 'incident'");

    if (ciName) {
      filters.push("c.ciName = @ciName");
      parameters.push({ name: "@ciName", value: ciName });
    }
    if (incidentNo) {
      filters.push("c.incidentNo = @incidentNo");
      parameters.push({ name: "@incidentNo", value: incidentNo });
    }
    if (filters.length > 0) query += " WHERE " + filters.join(" AND ");

    query += " ORDER BY c.updatedDate DESC";

    const { resources } = await container.items.query({ query, parameters }).fetchAll();

    if (incidentNo) {
      if (!resources.length) {
        return NextResponse.json({ message: "Incident not found" }, { status: 404 });
      }
      return NextResponse.json(cleanDocument(resources[0]));
    }

    return NextResponse.json({ incidents: cleanDocument(resources) }); // ✅ array

  } catch (err: any) {
    console.error("Query error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Create an incident
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const now = new Date().toISOString();

    const container = await getIncidentsContainer();

    const { resource } = await container.items.upsert({
      ...data,
      type: 'incident',
      createdDate: now,
      updatedDate: now
    });

    return NextResponse.json({ ...cleanDocument(resource) });

  } catch (err: any) {
    console.error("Create Error:", err);
    return NextResponse.json({ error: err.message }, { status: err.code === 409 ? 409 : 500 });
  }
}

// Update an incident by incidentNo
export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const incidentNo = url.searchParams.get("incidentNo");
    const data = await req.json();

    if (!incidentNo) return NextResponse.json({ error: "incidentNo query parameter is required" }, { status: 400 });

    const container = await getIncidentsContainer();

    const { resources } = await container.items
      .query({
        query: "SELECT * FROM c WHERE c.type='incident' AND c.incidentNo=@incidentNo",
        parameters: [{ name: "@incidentNo", value: incidentNo }]
      })
      .fetchAll();

    if (!resources.length) return NextResponse.json({ error: "Incident not found" }, { status: 404 });

    const item = resources[0];

    const patchOps = Object.keys(data)
      .filter((key) => key !== "incidentNo") // don't update partition key
      .map((key) => ({ op: "replace", path: `/${key}`, value: data[key] }));

    patchOps.push({ op: "replace", path: "/updatedDate", value: new Date().toISOString() });

    await container.item(item.id, item[partitionKeyName]).patch(patchOps);

    // Return updated document
    const { resource: updatedDoc } = await container.item(item.id, item[partitionKeyName]).read();
    return NextResponse.json(cleanDocument(updatedDoc));

  } catch (err: any) {
    console.error("Patch Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete incidents by ciName and/or incidentNo or all
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const ciName = url.searchParams.get("ciName");
    const incidentNo = url.searchParams.get("incidentNo");

    const container = await getIncidentsContainer();

    // Delete by incidentNo
    if (incidentNo) {
      // Fetch the document first
      const { resources } = await container.items
        .query({
          query: "SELECT * FROM c WHERE c.type='incident' AND c.incidentNo=@incidentNo",
          parameters: [{ name: "@incidentNo", value: incidentNo }]
        })
        .fetchAll();

      if (!resources.length) return NextResponse.json({ message: "Incident not found" }, { status: 404 });

      // Delete using actual id + partition key
      for (const item of resources) {
        await container.item(item.id, item[partitionKeyName]).delete();
      }

      return NextResponse.json({ message: `Deleted incident: ${incidentNo}` });
    }

    // Delete all incidents for a CI
    if (ciName) {
      const { resources } = await container.items
        .query({
          query: "SELECT * FROM c WHERE c.type='incident' AND c.ciName=@ciName",
          parameters: [{ name: "@ciName", value: ciName }]
        })
        .fetchAll();

      for (const doc of resources) {
        await container.item(doc.id, doc[partitionKeyName]).delete();
      }

      return NextResponse.json({ message: `Deleted all incidents for CI: ${ciName}` });
    }

    // Delete all incidents
    const { resources } = await container.items.query("SELECT * FROM c WHERE c.type='incident'").fetchAll();
    for (const doc of resources) {
      await container.item(doc.id, doc[partitionKeyName]).delete();
    }

    return NextResponse.json({ message: "Deleted ALL incidents" });

  } catch (err: any) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
