import { openai } from "@/lib/openai";

export async function generateAnswer(message: string) {
  const response = await openai.responses.create({
    model: "gpt-5.4-mini",
    input: message,
    store: true,
  });
 
  console.log(response.output_text);

  return response.output_text;
}

