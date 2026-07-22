// app/components/chat/Message.tsx
"use client";

import React, { useState } from "react";
import { Message as MessageType } from "../../types/chat";

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Basic formatting helper for markdown-like code blocks
  const renderFormattedContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const codeLines = part.slice(3, -3).trim().split("\n");
        const language = codeLines[0].match(/^[a-zA-Z]+$/) ? codeLines[0] : "";
        const code = language ? codeLines.slice(1).join("\n") : codeLines.join("\n");

        return (
          <div key={index} className="my-3 rounded-lg overflow-hidden bg-zinc-950 text-zinc-100 text-xs font-mono border border-zinc-800">
            {language && (
              <div className="bg-zinc-900 px-3 py-1.5 text-zinc-400 text-[10px] font-semibold uppercase tracking-wider border-b border-zinc-800">
                {language}
              </div>
            )}
            <pre className="p-3 overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      return (
        <span key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </span>
      );
    });
  };

  return (
    <div
      className={`group relative flex items-start space-x-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 shadow-sm ${
          isUser ? "bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900" : "bg-indigo-600"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>

      {/* Bubble Container */}
      <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`relative px-4 py-3 rounded-2xl text-sm shadow-sm transition-all ${
            isUser
              ? "bg-indigo-600 text-white rounded-tr-sm"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm border border-zinc-200/50 dark:border-zinc-700/50"
          }`}
        >
          {renderFormattedContent(message.content)}
        </div>

        {/* Footer Actions & Timestamp */}
        <div className={`flex items-center gap-2 mt-1 px-1 text-[11px] text-zinc-400 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <span>{formatTime(message.createdAt)}</span>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 hover:text-zinc-600 dark:hover:text-zinc-200 transition-opacity flex items-center gap-1"
              title="Copy message"
            >
              {copied ? (
                <span className="text-emerald-500 font-medium">Copied!</span>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};