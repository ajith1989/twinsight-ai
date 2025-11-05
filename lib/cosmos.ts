// @ts-nocheck
import { CosmosClient } from "@azure/cosmos";

const { COSMOS_DB_ENDPOINT, COSMOS_DB_KEY } = process.env;

if (!COSMOS_DB_ENDPOINT || !COSMOS_DB_KEY) {
  throw new Error("Cosmos DB credentials missing in environment variables");
}

const client = new CosmosClient({
  endpoint: COSMOS_DB_ENDPOINT,
  key: COSMOS_DB_KEY,
});

// Returns a Cosmos DB container. It will create DB and container if not exist
export async function getContainer(
  dbName: string,
  containerName: string,
  partitionKey: string,
  uniqueKeys: Array = []
) {
  const { database } = await client.databases.createIfNotExists({ id: dbName });
  const { container } = await database.containers.createIfNotExists({
    id: containerName,
    partitionKey: { paths: [partitionKey], kind: "Hash" },
    uniqueKeyPolicy: {
      uniqueKeys: [{ paths: [uniqueKeys] }],
    },
  });
  return container;
}

// Cleans a Cosmos DB document by removing system properties
export function cleanDocument(input: any): any {
  // If array → clean each element
  if (Array.isArray(input)) {
    return input.map((item) => cleanDocument(item));
  }

  // If object → clean each key
  if (input !== null && typeof input === "object") {
    const excludedFields = ["_rid", "_self", "_etag", "_attachments", "_ts"];

    const cleaned: any = {};

    for (const [key, value] of Object.entries(input)) {
      if (!excludedFields.includes(key)) {
        cleaned[key] = cleanDocument(value);
      }
    }

    return cleaned;
  }

  // Primitive values (string, number, boolean, null) → return as is
  return input;
}
