import ollama from "ollama";


export async function createEmbedding(
    text:string
){

    const response =
        await ollama.embeddings({

            model:
            "nomic-embed-text",

            prompt:
            text

        });


    console.log(
        "Embedding dimensions:",
        response.embedding.length
    );


    return response.embedding;

}