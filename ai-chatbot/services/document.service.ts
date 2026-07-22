import fs from "fs/promises";
import path from "path";

import { extractPDFText } 
from "./pdf.service";

import { chunkText }
from "../utils/chunking";

import {createEmbedding}
from '../services/vector/embedding.service'


export async function saveDocument(
 file: File
) {


 const bytes =
 await file.arrayBuffer();


 const buffer =
 Buffer.from(bytes);



 const uploadDir =
 path.join(
 process.cwd(),
 "uploads"
 );


 await fs.mkdir(
 uploadDir,
 {
 recursive:true
 }
 );


 const filePath =
 path.join(
 uploadDir,
 file.name
 );


 await fs.writeFile(
 filePath,
 buffer
 );



 // Extract PDF text

 const pdf =
 await extractPDFText(
 filePath
 );



 // Split into chunks

 const chunks =
 chunkText(
 pdf.text
 );


 const embeddings = await Promise.all(
  chunks.map(async (chunk) => ({
    text: chunk,
    embedding: await createEmbedding(chunk),
  }))
);



 return {

   filename:file.name,

   pages:pdf.pages,

   chunksCount:
   chunks.length,

   chunks

 };

}