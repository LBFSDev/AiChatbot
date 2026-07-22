import { NextRequest, NextResponse } from "next/server";
import { saveDocument } from "../../../services/document.service";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }


    const result = await saveDocument(file);


    return NextResponse.json({
      message: "File uploaded successfully",
      document: result
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}