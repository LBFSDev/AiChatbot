import fs from "fs/promises";
import pdf from "pdf-parse";


export async function extractPDFText(filePath: string) {

  const buffer = await fs.readFile(filePath);

  const data = await pdf(buffer);

  return {
    text: data.text,
    pages: data.numpages,
  };
}