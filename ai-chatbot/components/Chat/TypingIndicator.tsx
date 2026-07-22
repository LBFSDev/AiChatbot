// app/components/chat/TypingIndicator.tsx
"use client";

import React from "react";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 max-w-[85%] md:max-w-[75%] animate-fade-in my-2">
      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
        AI
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center space-x-1.5">
        <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
};