"use client";

import { ChatItem } from "@/contexts/types";
import ChatListHeader from "./chat-list-header";
import ChatListItem from "./chat-list-item";

interface ChatListProps {
  chats: ChatItem[];
  currentChatId: string | null;
  loading: boolean;
  error: string | null;
  onChatClick: (chatId: string) => void;
  onRetry: () => void;
  onAddFriend?: () => void;
  onSearch?: (query: string) => void;
  LoadingComponent?: React.ComponentType;
  ErrorComponent?: React.ComponentType<{ onRetry: () => void; message?: string }>;
}

export default function ChatList({
  chats,
  currentChatId,
  loading,
  error,
  onChatClick,
  onRetry,
  onAddFriend,
  onSearch,
  LoadingComponent,
  ErrorComponent,
}: ChatListProps) {
  const renderChatList = () => {
    if (loading && LoadingComponent) {
      return <LoadingComponent />;
    }

    if (error && ErrorComponent) {
      return <ErrorComponent onRetry={onRetry} message={error} />;
    }

    return (
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={currentChatId === chat.id}
            onClick={onChatClick}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-80 bg-background border-r border-border flex flex-col">
      <ChatListHeader onAddFriend={onAddFriend} onSearch={onSearch} />
      {renderChatList()}
    </div>
  );
}
