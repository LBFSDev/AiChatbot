import { Pool } from "pg";


console.log(
    "DATABASE URL:",
    process.env.DATABASE_URL
);


export const vectorDB = new Pool({
    connectionString: process.env.DATABASE_URL
});