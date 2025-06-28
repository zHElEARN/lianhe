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
import { useEffect, useState } from "react";

interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const currentChatId = pathname.startsWith("/chat/")
    ? pathname.split("/")[2]
    : null;

  useEffect(() => {
    const fetchChats = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:8000/chats");
        const data: ChatItem[] = await response.json();

        const formattedChats: ChatItem[] = data.map((chat: ChatItem) => ({
          ...chat,
          lastTime: formatTime(chat.lastTime),
        }));

        setChats(formattedChats);
      } catch (error) {
        console.error("获取聊天列表失败:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const formatTime = (timeStr: string): string => {
    const time = new Date(timeStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate()
    );

    if (messageDate.getTime() === today.getTime()) {
      return time.toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (
      messageDate.getTime() ===
      today.getTime() - 24 * 60 * 60 * 1000
    ) {
      return "昨天";
    } else {
      return time.toLocaleDateString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
      });
    }
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
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

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-muted-foreground">加载中...</div>
            </div>
          ) : (
            chats.map((chat) => (
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
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
