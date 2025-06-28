"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";

interface ChatListHeaderProps {
  onAddFriend?: () => void;
  onSearch?: (query: string) => void;
}

export default function ChatListHeader({ 
  onAddFriend,
  onSearch 
}: ChatListHeaderProps) {
  const handleAddFriend = () => {
    if (onAddFriend) {
      onAddFriend();
    } else {
      console.log("添加好友");
    }
  };

  return (
    <div className="p-4 border-b border-border">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="搜索" 
            className="pl-10"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="px-3 h-9"
          onClick={handleAddFriend}
        >
          <UserPlus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
