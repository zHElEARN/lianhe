"use client";

import { ArrowLeft, Send } from "lucide-react";
import { use, useEffect, useState } from "react";
import ChatError, { ChatNotFound } from "./error";
import ChatSkeleton from "./skeleton";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
}

interface ChatRecord {
  chatId: string;
  chatName: string;
  messages: Message[];
}

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [chatRecord, setChatRecord] = useState<ChatRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchChatRecord();
  }, [id]);

  const fetchChatRecord = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/chats/${id}`);
      if (!response.ok) {
        throw new Error("获取聊天记录失败");
      }
      const data = await response.json();
      setChatRecord(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取聊天记录失败");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      // 模拟发送消息
      const message: Message = {
        id: Date.now().toString(),
        sender: "我",
        content: newMessage,
        timestamp: new Date().toISOString(),
        isSelf: true,
      };

      setChatRecord((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, message],
            }
          : null
      );

      setNewMessage("");
    } catch (err) {
      console.error("发送消息失败:", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <ChatSkeleton />;
  }

  if (error) {
    return <ChatError error={error} onRetry={fetchChatRecord} />;
  }

  if (!chatRecord) {
    return <ChatNotFound />;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="bg-card border-b border-border px-4 py-3 flex items-center">
        <button
          onClick={() => window.history.back()}
          className="mr-3 p-1 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex items-center">
          <h1 className="ml-3 text-lg font-semibold text-foreground">
            {chatRecord.chatName}
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {chatRecord.messages.map((message) => (
          <div
            key={message.id}
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
        ))}
      </div>

      <div className="bg-card border-t border-border px-4 py-3">
        <div className="flex items-end space-x-3 items-stretch">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              className="w-full px-3 py-2 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
              rows={1}
              style={{
                minHeight: "40px",
                maxHeight: "120px",
              }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 h-10 w-10 ${
              newMessage.trim() && !sending
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
