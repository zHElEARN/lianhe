"use client";

import { ChatHeader, MessageInput, MessageList } from "@/components/chat";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/chat-context";
import { AlertCircle, RefreshCw } from "lucide-react";
import { use, useEffect } from "react";
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

  if (loading.currentChat || (!currentChatRecord && !error.currentChat)) {
    return <ChatSkeleton />;
  }

  if (error.currentChat) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center p-6 max-w-md">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">加载失败</h2>
          <p className="text-muted-foreground mb-4">{error.currentChat}</p>
          <Button onClick={handleRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            重试
          </Button>
        </div>
      </div>
    );
  }

  if (!currentChatRecord) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center p-6 max-w-md">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            聊天记录不存在
          </h2>
          <p className="text-muted-foreground">
            找不到指定的聊天记录，请检查链接是否正确。
          </p>
        </div>
      </div>
    );
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
