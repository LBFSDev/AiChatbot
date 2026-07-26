// app/api/documents/route.ts

import { vectorDB } from "@/lib/db";

export async function GET() {

  const result = await vectorDB.query(
    `
    SELECT id, filename
    FROM documents
    ORDER BY id DESC;
    `
  );

  return Response.json(result.rows);
}