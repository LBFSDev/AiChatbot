// app/components/chat/Chat.tsx
"use client";

import React, { useState } from "react";
import { Message } from "../../types/chat";
import { Header } from "./Header";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I am your AI assistant. How can I help you today?",
      createdAt: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
const handleSendMessage = async (content: string) => {
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content,
    createdAt: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setIsLoading(true);

  
    // // Mock response simulation — Replace this with your API call or Stream reader
    // setTimeout(() => {
    //   const aiResponse: Message = {
    //     id: (Date.now() + 1).toString(),
    //     role: "assistant",
    //     content: `I received your message: "${content}". \n\nHere is an example code block:\n\`\`\`typescript\nconst greeting = "Hello World";\nconsole.log(greeting);\n\`\`\``,
    //     createdAt: new Date(),
    //   };
    //   setMessages((prev) => [...prev, aiResponse]);
    //   setIsLoading(false);
    // }, 1200);
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: content,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response");
    }

    const data = await response.json();

    const aiMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: data.reply,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);

  } catch (error) {
    console.error(error);

    const errorMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: "Sorry, something went wrong.",
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, errorMessage]);

  } finally {
    setIsLoading(false);
  }
};
  


  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white dark:bg-zinc-900 border-x border-zinc-200 dark:border-zinc-800 shadow-xl">
      <Header onClearChat={handleClearChat} />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default Chat;