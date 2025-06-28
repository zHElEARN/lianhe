"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import {
  ChatContextType,
  ChatItem,
  ChatRecord,
  ChatState,
  Message,
  User,
} from "./types";

type ChatAction =
  | { type: "SET_CHATS_LOADING"; payload: boolean }
  | { type: "SET_CHATS"; payload: ChatItem[] }
  | { type: "SET_CHATS_ERROR"; payload: string | null }
  | { type: "SET_CURRENT_CHAT_LOADING"; payload: boolean }
  | { type: "SET_CURRENT_CHAT_ID"; payload: string | null }
  | { type: "SET_CURRENT_CHAT_RECORD"; payload: ChatRecord | null }
  | { type: "SET_CURRENT_CHAT_ERROR"; payload: string | null }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_USER"; payload: User | null }
  | {
      type: "UPDATE_CHAT_LAST_MESSAGE";
      payload: { chatId: string; message: string; timestamp: string };
    };

const initialState: ChatState = {
  user: null,
  chats: [],
  currentChatId: null,
  currentChatRecord: null,
  loading: {
    chats: false,
    currentChat: false,
  },
  error: {
    chats: null,
    currentChat: null,
  },
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_CHATS_LOADING":
      return {
        ...state,
        loading: { ...state.loading, chats: action.payload },
      };

    case "SET_CHATS":
      return {
        ...state,
        chats: action.payload,
        loading: { ...state.loading, chats: false },
        error: { ...state.error, chats: null },
      };

    case "SET_CHATS_ERROR":
      return {
        ...state,
        error: { ...state.error, chats: action.payload },
        loading: { ...state.loading, chats: false },
      };

    case "SET_CURRENT_CHAT_LOADING":
      return {
        ...state,
        loading: { ...state.loading, currentChat: action.payload },
      };

    case "SET_CURRENT_CHAT_ID":
      return {
        ...state,
        currentChatId: action.payload,
      };

    case "SET_CURRENT_CHAT_RECORD":
      return {
        ...state,
        currentChatRecord: action.payload,
        loading: { ...state.loading, currentChat: false },
        error: { ...state.error, currentChat: null },
      };

    case "SET_CURRENT_CHAT_ERROR":
      return {
        ...state,
        error: { ...state.error, currentChat: action.payload },
        loading: { ...state.loading, currentChat: false },
      };

    case "ADD_MESSAGE":
      if (!state.currentChatRecord) return state;
      return {
        ...state,
        currentChatRecord: {
          ...state.currentChatRecord,
          messages: [...state.currentChatRecord.messages, action.payload],
        },
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "UPDATE_CHAT_LAST_MESSAGE":
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.payload.chatId
            ? {
                ...chat,
                lastMessage: action.payload.message,
                lastTime: action.payload.timestamp,
              }
            : chat
        ),
      };

    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

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
  } else if (messageDate.getTime() === today.getTime() - 24 * 60 * 60 * 1000) {
    return "昨天";
  } else {
    return time.toLocaleDateString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
    });
  }
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const fetchChats = useCallback(async () => {
    dispatch({ type: "SET_CHATS_LOADING", payload: true });
    try {
      const response = await fetch("/api/chats");
      if (!response.ok) {
        throw new Error("获取聊天列表失败");
      }
      const data: ChatItem[] = await response.json();

      const formattedChats: ChatItem[] = data.map((chat: ChatItem) => ({
        ...chat,
        lastTime: formatTime(chat.lastTime),
      }));

      dispatch({ type: "SET_CHATS", payload: formattedChats });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "无法加载聊天列表，请检查网络连接";
      dispatch({ type: "SET_CHATS_ERROR", payload: errorMessage });
    }
  }, []);

  const refreshChats = useCallback(async () => {
    await fetchChats();
  }, [fetchChats]);

  const setCurrentChatId = useCallback((chatId: string | null) => {
    dispatch({ type: "SET_CURRENT_CHAT_ID", payload: chatId });
    if (!chatId) {
      dispatch({ type: "SET_CURRENT_CHAT_RECORD", payload: null });
    }
  }, []);

  const fetchChatRecord = useCallback(async (chatId: string) => {
    dispatch({ type: "SET_CURRENT_CHAT_LOADING", payload: true });
    try {
      const response = await fetch(`/api/chats/${chatId}`);
      if (!response.ok) {
        throw new Error("获取聊天记录失败");
      }
      const data: ChatRecord = await response.json();
      dispatch({ type: "SET_CURRENT_CHAT_RECORD", payload: data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "获取聊天记录失败";
      dispatch({ type: "SET_CURRENT_CHAT_ERROR", payload: errorMessage });
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!state.currentChatId || !content.trim()) return;

      try {
        const message: Message = {
          id: Date.now().toString(),
          sender: "我",
          content: content.trim(),
          timestamp: new Date().toISOString(),
          isSelf: true,
        };

        dispatch({ type: "ADD_MESSAGE", payload: message });

        dispatch({
          type: "UPDATE_CHAT_LAST_MESSAGE",
          payload: {
            chatId: state.currentChatId,
            message: content.trim(),
            timestamp: message.timestamp,
          },
        });
      } catch (error) {
        console.error("发送消息失败:", error);
      }
    },
    [state.currentChatId]
  );

  const clearChatError = useCallback(() => {
    dispatch({ type: "SET_CHATS_ERROR", payload: null });
  }, []);

  const clearCurrentChatError = useCallback(() => {
    dispatch({ type: "SET_CURRENT_CHAT_ERROR", payload: null });
  }, []);

  const setUser = useCallback((user: User) => {
    dispatch({ type: "SET_USER", payload: user });
  }, []);

  const contextValue: ChatContextType = {
    ...state,
    fetchChats,
    refreshChats,
    setCurrentChatId,
    fetchChatRecord,
    sendMessage,
    clearChatError,
    clearCurrentChatError,
    setUser,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within an ChatProvider");
  }
  return context;
}
