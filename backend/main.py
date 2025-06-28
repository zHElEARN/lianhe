from datetime import datetime
from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatItem(BaseModel):
    id: str
    name: str
    avatar: str
    last_message: str = Field(alias="lastMessage")
    last_time: datetime = Field(alias="lastTime")
    unread_count: int = Field(alias="unreadCount")

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}


class Message(BaseModel):
    id: str
    sender: str
    content: str
    timestamp: datetime
    is_self: bool = Field(alias="isSelf")

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}


class ChatRecord(BaseModel):
    chat_id: str = Field(alias="chatId")
    chat_name: str = Field(alias="chatName")
    messages: List[Message]

    class Config:
        populate_by_name = True


mock_chat_list = [
    ChatItem(
        id="550e8400-e29b-41d4-a716-446655440001",
        name="张三",
        avatar="https://i.pravatar.cc/40?img=1",
        last_message="你好，最近怎么样？",
        last_time=datetime(2024, 1, 15, 10, 30),
        unread_count=2,
    ),
    ChatItem(
        id="550e8400-e29b-41d4-a716-446655440002",
        name="李四",
        avatar="https://i.pravatar.cc/40?img=2",
        last_message="明天的会议记得参加",
        last_time=datetime(2024, 1, 15, 9, 15),
        unread_count=0,
    ),
    ChatItem(
        id="550e8400-e29b-41d4-a716-446655440003",
        name="工作群",
        avatar="https://i.pravatar.cc/40?img=3",
        last_message="项目进度如何？",
        last_time=datetime(2024, 1, 14, 14, 30),
        unread_count=5,
    ),
]

mock_chat_records = {
    "550e8400-e29b-41d4-a716-446655440001": ChatRecord(
        chat_id="550e8400-e29b-41d4-a716-446655440001",
        chat_name="张三",
        messages=[
            Message(
                id="f47ac10b-58cc-4372-a567-0e02b2c3d479",
                sender="张三",
                content="你好！",
                timestamp=datetime(2024, 1, 15, 9, 0),
                is_self=False,
            ),
            Message(
                id="6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                sender="我",
                content="你好，最近忙什么呢？",
                timestamp=datetime(2024, 1, 15, 9, 2),
                is_self=True,
            ),
            Message(
                id="6ba7b811-9dad-11d1-80b4-00c04fd430c8",
                sender="张三",
                content="在准备一个新项目",
                timestamp=datetime(2024, 1, 15, 9, 5),
                is_self=False,
            ),
            Message(
                id="6ba7b812-9dad-11d1-80b4-00c04fd430c8",
                sender="张三",
                content="你好，最近怎么样？",
                timestamp=datetime(2024, 1, 15, 10, 30),
                is_self=False,
            ),
        ],
    ),
    "550e8400-e29b-41d4-a716-446655440002": ChatRecord(
        chat_id="550e8400-e29b-41d4-a716-446655440002",
        chat_name="李四",
        messages=[
            Message(
                id="6ba7b813-9dad-11d1-80b4-00c04fd430c8",
                sender="李四",
                content="明天的会议记得参加",
                timestamp=datetime(2024, 1, 15, 9, 15),
                is_self=False,
            ),
            Message(
                id="6ba7b814-9dad-11d1-80b4-00c04fd430c8",
                sender="我",
                content="好的，收到",
                timestamp=datetime(2024, 1, 15, 9, 20),
                is_self=True,
            ),
        ],
    ),
    "550e8400-e29b-41d4-a716-446655440003": ChatRecord(
        chat_id="550e8400-e29b-41d4-a716-446655440003",
        chat_name="工作群",
        messages=[
            Message(
                id="6ba7b815-9dad-11d1-80b4-00c04fd430c8",
                sender="经理",
                content="大家好",
                timestamp=datetime(2024, 1, 15, 8, 0),
                is_self=False,
            ),
            Message(
                id="6ba7b816-9dad-11d1-80b4-00c04fd430c8",
                sender="同事A",
                content="早上好",
                timestamp=datetime(2024, 1, 15, 8, 5),
                is_self=False,
            ),
            Message(
                id="6ba7b817-9dad-11d1-80b4-00c04fd430c8",
                sender="我",
                content="早上好",
                timestamp=datetime(2024, 1, 15, 8, 6),
                is_self=True,
            ),
            Message(
                id="6ba7b818-9dad-11d1-80b4-00c04fd430c8",
                sender="经理",
                content="项目进度如何？",
                timestamp=datetime(2024, 1, 14, 14, 30),
                is_self=False,
            ),
        ],
    ),
}


@app.get("/chats", response_model=List[ChatItem])
async def get_chat_list():
    """获取聊天列表"""
    return mock_chat_list


@app.get("/chats/{chat_id}", response_model=ChatRecord)
async def get_chat_record(chat_id: str):
    """根据ID获取聊天记录"""
    if chat_id not in mock_chat_records:
        raise HTTPException(status_code=404, detail="聊天记录不存在")
    return mock_chat_records[chat_id]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
