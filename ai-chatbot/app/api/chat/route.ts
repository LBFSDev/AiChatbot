import { NextRequest, NextResponse } from "next/server";
import { generateAnswer } from "../../../services/ai.service";


export async function POST(req:NextRequest){


     try {
 const {message}=await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }
    
 const answer = await generateAnswer(message);


 return NextResponse.json({
   reply:answer
 });
}catch(error){
     console.error(error);
        return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
}

}