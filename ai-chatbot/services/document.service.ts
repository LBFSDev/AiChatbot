import fs from "fs/promises";
import path from "path";

import { extractPDFText } 
from "./pdf.service";

import { chunkText }
from "../utils/chunking";

import {createEmbedding}
from '../services/vector/embedding.service'

import {saveEmbedding} 
from '../services/vector/vector.service'

import { createDocument }
from "./document.repository";





export async function saveDocument(file:File){

 const bytes =
 await file.arrayBuffer();


 const buffer =
 Buffer.from(bytes);


 const uploadDir =
 path.join(process.cwd(),"uploads");


 await fs.mkdir(uploadDir,{
    recursive:true
 });


 const filePath =
 path.join(uploadDir,file.name);


 await fs.writeFile(
    filePath,
    buffer
 );


 const pdf =
 await extractPDFText(filePath);

 const documentId =
await createDocument(
    file.name,
    pdf.pages
);



 const chunks =
 chunkText(pdf.text);




 for(const chunk of chunks){

    const vector =
        await createEmbedding(chunk);

  console.log("Chunk length:", chunk.length);
  console.log("Embedding dimensions:", vector.length);

    await saveEmbedding(

        documentId,

        chunk,

        vector

    );

}



 return {

    filename:file.name,

    pages:pdf.pages,

    chunksCount:chunks.length

 };

}