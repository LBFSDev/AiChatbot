import fs from "fs/promises";
import { PDFParse } from "pdf-parse";


export async function extractPDFText(
  filePath: string
) {

  const buffer = await fs.readFile(filePath);

    const parser = new PDFParse({
    data: buffer
  });


  const result = await parser.getText();
  const infoResult = await parser.getInfo();

  return {
    text: result.text,
    pages: infoResult.total
  };
}