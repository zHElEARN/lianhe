"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatItem } from "@/contexts/types";

interface ChatListItemProps {
  chat: ChatItem;
  isActive: boolean;
  onClick: (chatId: string) => void;
}

export default function ChatListItem({ 
  chat, 
  isActive, 
  onClick 
}: ChatListItemProps) {
  return (
    <div
      className={`flex items-center p-4 hover:bg-accent cursor-pointer border-b border-border ${
        isActive ? "bg-accent" : ""
      }`}
      onClick={() => onClick(chat.id)}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="w-12 h-12">
          <AvatarImage src={chat.avatar} alt={chat.name} />
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {chat.unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
          </div>
        )}
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground truncate">
            {chat.name}
          </h3>
          <span className="text-xs text-muted-foreground">
            {chat.lastTime}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate mt-1">
          {chat.lastMessage}
        </p>
      </div>
    </div>
  );
}
