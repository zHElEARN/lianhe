"use client";

import { Send } from "lucide-react";
import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => Promise<void>;
  disabled?: boolean;
}

export default function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim() || sending || disabled) return;

    setSending(true);
    try {
      await onSendMessage(message);
      setMessage("");
    } catch (err) {
      console.error("发送消息失败:", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-card border-t border-border px-4 py-3">
      <div className="flex items-end space-x-3 items-stretch">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            disabled={disabled || sending}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{
              minHeight: "40px",
              maxHeight: "120px",
            }}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!message.trim() || sending || disabled}
          className={`p-2 rounded-lg transition-colors flex-shrink-0 h-10 w-10 ${
            message.trim() && !sending && !disabled
              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
