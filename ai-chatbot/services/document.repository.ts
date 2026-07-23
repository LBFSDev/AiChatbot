import { vectorDB } from "@/lib/db";


export async function createDocument(
    filename:string,
    pages:number
){

    console.log("CREATE DOCUMENT START");


    const dbCheck =
    await vectorDB.query(`
        SELECT 
            current_database(),
            current_schema();
    `);


    console.log(
        "DATABASE:",
        dbCheck.rows
    );


    const tables =
    await vectorDB.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public';
    `);


    console.log(
        "TABLES:",
        tables.rows
    );



    const result =
    await vectorDB.query(
        `
        INSERT INTO documents
        (
            filename,
            pages
        )
        VALUES
        (
            $1,
            $2
        )
        RETURNING id
        `,
        [
            filename,
            pages
        ]
    );


    return result.rows[0].id;

}