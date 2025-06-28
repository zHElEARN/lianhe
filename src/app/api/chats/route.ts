import { NextResponse } from "next/server";

export interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
}

const mockChatList: ChatItem[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "张三",
    avatar: "https://i.pravatar.cc/40?img=1",
    lastMessage: "你好，最近怎么样？",
    lastTime: "2024-01-15T10:30:00.000Z",
    unreadCount: 2,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "李四",
    avatar: "https://i.pravatar.cc/40?img=2",
    lastMessage: "明天的会议记得参加",
    lastTime: "2024-01-15T09:15:00.000Z",
    unreadCount: 0,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "工作群",
    avatar: "https://i.pravatar.cc/40?img=3",
    lastMessage: "项目进度如何？",
    lastTime: "2024-01-14T14:30:00.000Z",
    unreadCount: 5,
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockChatList);
  } catch {
    return NextResponse.json({ error: "获取聊天列表失败" }, { status: 500 });
  }
}
