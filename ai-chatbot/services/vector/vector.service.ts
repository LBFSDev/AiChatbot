import { vectorDB }
from "@/lib/db";


export async function saveEmbedding(

    documentId:number,

    content:string,

    embedding:number[]

){

    await vectorDB.query(

    `
    INSERT INTO document_chunks
    (
        document_id,
        content,
        embedding
    )

    VALUES
    (
        $1,
        $2,
        $3::vector
    )
    `,

    [
        documentId,
        content,
        `[${embedding.join(",")}]`
    ]

    );

}

