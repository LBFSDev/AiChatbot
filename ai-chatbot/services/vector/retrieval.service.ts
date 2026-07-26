import { vectorDB } from "@/lib/db";

export async function searchSimilarChunks(
  embedding: number[],
  limit = 2
) {
  // PostgreSQL expects the vector as a string like "[0.1,0.2,...]"
  const vector = `[${embedding.join(",")}]`;

  const result = await vectorDB.query(
    `
    SELECT
      id,
      document_id,
      content,
      embedding <=> $1::vector AS distance
    FROM document_chunks
    WHERE document_id =$3 and embedding <=> $1::vector < 0.35 
    ORDER BY embedding <=> $1::vector
    LIMIT $2;
    `,
    [vector, limit,2]
  );

      console.log(
        "Search results:",
        result.rows.length
    );

    console.log("Query vector length:", embedding.length);

    console.log(
  result.rows.map(row => ({
    distance: row.distance,
    size: row.content.length,
    preview: row.content.substring(0, 150)
  }))
);

  return result.rows;
}

