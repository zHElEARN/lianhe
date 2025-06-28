import { NextResponse } from "next/server";

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
}

export interface ChatRecord {
  chatId: string;
  chatName: string;
  messages: Message[];
}

const mockChatRecords: Record<string, ChatRecord> = {
  "550e8400-e29b-41d4-a716-446655440001": {
    chatId: "550e8400-e29b-41d4-a716-446655440001",
    chatName: "张三",
    messages: [
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        sender: "张三",
        content: "你好！",
        timestamp: "2024-01-15T09:00:00.000Z",
        isSelf: false,
      },
      {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        sender: "我",
        content: "你好，最近忙什么呢？",
        timestamp: "2024-01-15T09:02:00.000Z",
        isSelf: true,
      },
      {
        id: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
        sender: "张三",
        content: "在准备一个新项目",
        timestamp: "2024-01-15T09:05:00.000Z",
        isSelf: false,
      },
      {
        id: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
        sender: "张三",
        content: "你好，最近怎么样？",
        timestamp: "2024-01-15T10:30:00.000Z",
        isSelf: false,
      },
    ],
  },
  "550e8400-e29b-41d4-a716-446655440002": {
    chatId: "550e8400-e29b-41d4-a716-446655440002",
    chatName: "李四",
    messages: [
      {
        id: "6ba7b813-9dad-11d1-80b4-00c04fd430c8",
        sender: "李四",
        content: "明天的会议记得参加",
        timestamp: "2024-01-15T09:15:00.000Z",
        isSelf: false,
      },
      {
        id: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
        sender: "我",
        content: "好的，收到",
        timestamp: "2024-01-15T09:20:00.000Z",
        isSelf: true,
      },
    ],
  },
  "550e8400-e29b-41d4-a716-446655440003": {
    chatId: "550e8400-e29b-41d4-a716-446655440003",
    chatName: "工作群",
    messages: [
      {
        id: "6ba7b815-9dad-11d1-80b4-00c04fd430c8",
        sender: "经理",
        content: "大家好",
        timestamp: "2024-01-15T08:00:00.000Z",
        isSelf: false,
      },
      {
        id: "6ba7b816-9dad-11d1-80b4-00c04fd430c8",
        sender: "同事A",
        content: "早上好",
        timestamp: "2024-01-15T08:05:00.000Z",
        isSelf: false,
      },
      {
        id: "6ba7b817-9dad-11d1-80b4-00c04fd430c8",
        sender: "我",
        content: "早上好",
        timestamp: "2024-01-15T08:06:00.000Z",
        isSelf: true,
      },
      {
        id: "6ba7b818-9dad-11d1-80b4-00c04fd430c8",
        sender: "经理",
        content: "项目进度如何？",
        timestamp: "2024-01-14T14:30:00.000Z",
        isSelf: false,
      },
    ],
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const chatId = (await params).id;

    if (!mockChatRecords[chatId]) {
      return NextResponse.json({ error: "聊天记录不存在" }, { status: 404 });
    }

    return NextResponse.json(mockChatRecords[chatId]);
  } catch {
    return NextResponse.json({ error: "获取聊天记录失败" }, { status: 500 });
  }
}
