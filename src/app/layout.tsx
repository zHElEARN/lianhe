"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import "./globals.css";

interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <html lang="zh-CN">
      <body className="h-screen overflow-hidden">
        <div className="flex h-full">
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="搜索"
                    className="pl-10 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
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
                  <div className="text-gray-500">加载中...</div>
                </div>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  >
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={chat.avatar} alt={chat.name} />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {chat.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                        </div>
                      )}
                    </div>

                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {chat.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {chat.lastTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-1">
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
      </body>
    </html>
  );
}
