// export async function askLLM(prompt: string) {

//     const response = await fetch(
//         "http://localhost:11434/api/generate",
//         {
//             method: "POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify({
//                 model:"llama3",
//                 prompt,
//                 stream:false
//             })
//         }
//     );

//     return response.json();
// }




//but now since iam testing i will use it later

export async function askLLM(prompt: string) {

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 10 * 60 * 1000); // 10 minutes

    try {

        const response = await fetch(
            "http://localhost:11434/api/generate",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                signal: controller.signal,
                body: JSON.stringify({
                    // model:"llama3",
                    model:"llama3.2:3b",
                    prompt,
                    stream:false,
                    keep_alive:"30m",//keep_alive tells Ollama how long to keep the model loaded in memory after the request finishes.
                    //If another request arrives within those 30 minutes: the model is already loaded so generate answer immediately
                     options:{ // to prevent generating long responses
                  num_predict:100, //limit the answer length
                   temperature: 0.1 //temperature controls how random or deterministic the model's output is.
                       }
                    
                })
            }
        );

        return await response.json();

    } finally {
        clearTimeout(timeout);
    }
}