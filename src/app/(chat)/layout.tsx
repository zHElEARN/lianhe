"use client";

import { ChatList, Sidebar } from "@/components/chat";
import { useChat } from "@/contexts/chat-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChatError } from "./error";
import { ChatListSkeleton } from "./skeleton";

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
        ErrorComponent={ChatError}
      />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
