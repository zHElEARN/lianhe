"use client";

import { ChatList, Sidebar } from "@/components/chat";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/chat-context";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChatListSkeleton } from "./skeleton";

const ChatErrorComponent = ({
  onRetry,
  message = "获取聊天列表失败",
}: {
  onRetry?: () => void;
  message?: string;
}) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8">
    <div className="text-center space-y-4">
      <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
      <div>
        <h3 className="text-lg font-medium text-foreground">出错了</h3>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-4">
          <RefreshCw className="w-4 h-4 mr-2" />
          重试
        </Button>
      )}
    </div>
  </div>
);

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chats, currentChatId, loading, error, fetchChats, setCurrentChatId } =
    useChat();

  const router = useRouter();
  const pathname = usePathname();

  const pathChatId = pathname.startsWith("/chat/")
    ? pathname.split("/")[2]
    : null;

  useEffect(() => {
    if (pathChatId !== currentChatId) {
      setCurrentChatId(pathChatId);
    }
  }, [pathChatId, currentChatId, setCurrentChatId]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const handleAddFriend = () => {
    console.log("添加好友");
  };

  const handleSearch = (query: string) => {
    console.log("搜索:", query);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatList
        chats={chats}
        currentChatId={currentChatId}
        loading={loading.chats}
        error={error.chats}
        onChatClick={handleChatClick}
        onRetry={fetchChats}
        onAddFriend={handleAddFriend}
        onSearch={handleSearch}
        LoadingComponent={ChatListSkeleton}
        ErrorComponent={ChatErrorComponent}
      />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
