"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Camera,
  MessageSquare,
  Monitor,
  Moon,
  MoreHorizontal,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Sidebar() {
  const { setTheme } = useTheme();

  return (
    <div className="w-16 bg-sidebar flex flex-col items-center py-4 border-r border-border">
      <div className="mb-6">
        <Avatar className="w-10 h-10">
          <AvatarImage src="#" alt="用户头像" />
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
  );
}
