// app/components/chat/ChatMessages.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { Message as MessageType } from "../../types/chat";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";

interface ChatMessagesProps {
  messages: MessageType[];
  isLoading: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-400 dark:text-zinc-500 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
            💬
          </div>
          <p className="text-sm font-medium">How can I help you today?</p>
        </div>
      ) : (
        messages.map((msg) => <Message key={msg.id} message={msg} />)
      )}

      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};