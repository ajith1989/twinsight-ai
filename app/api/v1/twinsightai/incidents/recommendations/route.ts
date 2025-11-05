// @ts-nocheck
import { NextResponse } from "next/server";
import { getContainer, cleanDocument } from "@/lib/cosmos";

const { INCIDENTS_DB_NAME, INCIDENTS_DB_CONTAINER_NAME } = process.env;

const INCIDENTS_PARTITION_KEY = "/incidentNo";
const RECOMMENDATIONS_UNIQUE_KEYS = ["/incidentNo", "/agentId", "/type"];

const partitionKeyName = INCIDENTS_PARTITION_KEY.replace("/", "");

async function getIncidentsContainer() {
  return await getContainer(
    INCIDENTS_DB_NAME!,
    INCIDENTS_DB_CONTAINER_NAME!,
    INCIDENTS_PARTITION_KEY,
    RECOMMENDATIONS_UNIQUE_KEYS
  );
}

// Retrieve AI agent recommendations by incidentNo and optional agentId
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const incidentNo = url.searchParams.get("incidentNo");
    const agentId = url.searchParams.get("agentId");

    const container = await getIncidentsContainer();
    let query =
      "SELECT * FROM c WHERE c.type='recommendation' AND c.incidentNo=@incidentNo";
    const parameters: any[] = [{ name: "@incidentNo", value: incidentNo }];

    if (agentId) {
      query += " AND c.agentId=@agentId";
      parameters.push({ name: "@agentId", value: agentId });
    }

    query += " ORDER BY c.updatedDate";

    const { resources } = await container.items
      .query({ query, parameters })
      .fetchAll();
    return NextResponse.json({ recommendations: cleanDocument(resources) });
  } catch (err: any) {
    console.error("Query error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Create AI agent recommendation by incidentNo and agentId
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const now = new Date().toISOString();

    const container = await getIncidentsContainer();

    if (!data.incidentNo || !data.agentId || !data.recommendation) {
      return NextResponse.json(
        { error: "incidentNo, agentId and recommendation are required" },
        { status: 400 }
      );
    }

    const { resource } = await container.items.upsert({
      ...data,
      type: "recommendation",
      createdDate: now,
      updatedDate: now,
    });

    return NextResponse.json({ recommendation: cleanDocument(resource) });
  } catch (err: any) {
    console.error("Create Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Update AI agent recommendation by incidentNo and agentId
export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const incidentNo = url.searchParams.get("incidentNo");
    const agentId = url.searchParams.get("agentId");
    const data = await req.json();

    const container = await getIncidentsContainer();

    if (!agentId)
      return NextResponse.json(
        { error: "agentId is required" },
        { status: 400 }
      );

    const { resources } = await container.items
      .query({
        query:
          "SELECT * FROM c WHERE c.type='recommendation' AND c.incidentNo=@incidentNo AND c.agentId=@agentId",
        parameters: [
          { name: "@incidentNo", value: incidentNo },
          { name: "@agentId", value: agentId },
        ],
      })
      .fetchAll();

    if (!resources.length)
      return NextResponse.json(
        { error: "Recommendation not found" },
        { status: 404 }
      );

    const item = resources[0];

    const patchOps = Object.keys(data)
      .filter((k) => k !== "agentId") // don't patch agentId
      .map((key) => ({ op: "replace", path: `/${key}`, value: data[key] }));

    patchOps.push({
      op: "replace",
      path: "/updatedDate",
      value: new Date().toISOString(),
    });

    await container.item(item.id, incidentNo).patch(patchOps);

    // Return updated document
    const { resource: updatedDoc } = await container
      .item(item.id, item[partitionKeyName])
      .read();
    return NextResponse.json(cleanDocument(updatedDoc));
  } catch (err: any) {
    console.error("Patch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete AI agent recommendations by incidentNo, agentId + incidentNo, or all
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const incidentNo = url.searchParams.get("incidentNo");
    const agentId = url.searchParams.get("agentId");

    const container = await getIncidentsContainer();

    // Delete specific agent recommendation for an incident
    if (incidentNo && agentId) {
      // Fetch the document first
      const { resources } = await container.items
        .query({
          query:
            "SELECT * FROM c WHERE c.type='recommendation' AND c.incidentNo=@incidentNo AND c.agentId=@agentId",
          parameters: [
            { name: "@incidentNo", value: incidentNo },
            { name: "@agentId", value: agentId },
          ],
        })
        .fetchAll();

      if (!resources.length) {
        return NextResponse.json(
          {
            message: `No recommendation found for incident ${incidentNo} and agent ${agentId}`,
          },
          { status: 404 }
        );
      }

      // Delete using actual id + partition key
      for (const item of resources) {
        await container.item(item.id, item[partitionKeyName]).delete();
      }

      return NextResponse.json({
        message: `Deleted recommendation for incident ${incidentNo} and agent ${agentId}`,
      });
    }

    // Delete all recommendations for an incident
    if (incidentNo && !agentId) {
      const { resources } = await container.items
        .query({
          query:
            "SELECT c.id FROM c WHERE c.type='recommendation' AND c.incidentNo=@incidentNo",
          parameters: [{ name: "@incidentNo", value: incidentNo }],
        })
        .fetchAll();

      for (const doc of resources) {
        await container.item(doc.id, incidentNo).delete();
      }

      return NextResponse.json({
        message: `Deleted all recommendations for incident ${incidentNo}`,
      });
    }

    // Delete all recommendations
    const { resources } = await container.items
      .query("SELECT * FROM c WHERE c.type='recommendation'")
      .fetchAll();
    for (const doc of resources) {
      await container.item(doc.id, doc[partitionKeyName]).delete();
    }

    return NextResponse.json({ message: "Deleted ALL recommendations" });
  } catch (err: any) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
