"use client";

import { ChatHeader, MessageInput, MessageList } from "@/components/chat";
import { useChat } from "@/contexts/chat-context";
import { use, useEffect } from "react";
import ChatError, { ChatNotFound } from "./error";
import ChatSkeleton from "./skeleton";

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { currentChatRecord, loading, error, fetchChatRecord, sendMessage } =
    useChat();

  useEffect(() => {
    if (id) {
      fetchChatRecord(id);
    }
  }, [id, fetchChatRecord]);

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  const handleRetry = () => {
    if (id) {
      fetchChatRecord(id);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading.currentChat) {
    return <ChatSkeleton />;
  }

  if (error.currentChat) {
    return <ChatError error={error.currentChat} onRetry={handleRetry} />;
  }

  if (!currentChatRecord) {
    return <ChatNotFound />;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader 
        chatName={currentChatRecord.chatName} 
        onBack={handleBack}
      />
      <MessageList messages={currentChatRecord.messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
