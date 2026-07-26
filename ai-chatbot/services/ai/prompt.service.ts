// export function buildPrompt(
//     question: string,
//     chunks: any[]
// ) {

//     const context = chunks
//         .map(chunk => chunk.content)
//         .join("\n\n");

//     return `
// You are an AI assistant.

// Answer ONLY using the context below.

// Context:

// ${context}

// Question:

// ${question}
// `;
// }


export function buildPrompt(
    question: string,
    chunks: any[]
) {

    // const context = chunks
    //     .map(chunk => chunk.content)
    //     .join("\n\n");

    const context = chunks
    .map((chunk, index) =>
        `SOURCE ${index + 1}:\n${chunk.content}`
    )
    .join("\n\n");

    return `
You are a document question-answering assistant.

Rules:
- Answer only from the provided context.
- If the answer is not in the context, say "The document does not contain this information."


Context:

${context}

Question:

${question}

Answer:
`;
}