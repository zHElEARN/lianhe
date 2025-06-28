"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useChat } from "@/contexts/chat-context";
import {
  Camera,
  MessageSquare,
  Monitor,
  Moon,
  MoreHorizontal,
  Search,
  Sun,
  UserPlus,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
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

  const { setTheme } = useTheme();
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

  const renderChatList = () => {
    if (loading.chats) {
      return <ChatListSkeleton />;
    }

    if (error.chats) {
      return <ChatError onRetry={fetchChats} message={error.chats} />;
    }

    return (
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-4 hover:bg-accent cursor-pointer border-b border-border ${
              currentChatId === chat.id ? "bg-accent" : ""
            }`}
            onClick={() => handleChatClick(chat.id)}
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
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-16 bg-sidebar flex flex-col items-center py-4 border-r border-border">
        <div className="mb-6">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/api/placeholder/40/40" alt="用户头像" />
            <AvatarFallback className="bg-muted text-muted-foreground">
              我
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            <Users className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-40">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              浅色主题
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              深色主题
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              跟随系统
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-80 bg-background border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="text" placeholder="搜索" className="pl-10" />
            </div>
            <Button
              variant="outline"
              className="px-3 h-9"
              onClick={() => console.log("添加好友")}
            >
              <UserPlus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {renderChatList()}
      </div>

      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
