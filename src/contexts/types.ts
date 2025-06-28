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

export interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface ChatState {
  user: User | null;
  chats: ChatItem[];
  currentChatId: string | null;
  currentChatRecord: ChatRecord | null;
  loading: {
    chats: boolean;
    currentChat: boolean;
  };
  error: {
    chats: string | null;
    currentChat: string | null;
  };
}

export interface ChatContextType extends ChatState {
  fetchChats: () => Promise<void>;
  refreshChats: () => Promise<void>;

  setCurrentChatId: (chatId: string | null) => void;
  fetchChatRecord: (chatId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;

  clearChatError: () => void;
  clearCurrentChatError: () => void;

  setUser: (user: User) => void;
}
