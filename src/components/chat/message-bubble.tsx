"use client";

import { Message } from "@/contexts/types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex ${
        message.isSelf ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg ${
          message.isSelf
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground border border-border"
        } rounded-lg px-4 py-2 shadow-sm`}
      >
        {!message.isSelf && (
          <div className="text-xs text-muted-foreground mb-1">
            {message.sender}
          </div>
        )}
        <div className="text-sm">{message.content}</div>
        <div
          className={`text-xs mt-1 ${
            message.isSelf
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          }`}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
