import { createEmbedding } from "@/services/vector/embedding.service";
import { searchSimilarChunks } from "@/services/vector/retrieval.service";
import { buildPrompt } from "@/services/ai/prompt.service";
import { askLLM } from "@/services/ai/ai.service";

export async function POST(req: Request) {

    const { message } = await req.json();

    console.time("embedding");
    const embedding = await createEmbedding(message);
    console.timeEnd("embedding");
    console.log("Embedding length:", embedding.length);


    console.time("search");
    const chunks = await searchSimilarChunks(embedding);
    console.timeEnd("search");

    console.log("Retrieved chunks:");
chunks.forEach((chunk, i) => {
    console.log("CHUNK", i);
    console.log(chunk.content.substring(0, 500));
});


    console.time("prompt");
    const prompt = buildPrompt(message, chunks);
    console.timeEnd("prompt");
// console.log("Prompt:", prompt);
console.log("Prompt length:", prompt.length);

    console.time("llm");
    const answer = await askLLM(prompt);
    console.timeEnd("llm");
    console.log("Answer:", answer);
    return Response.json(answer);
}