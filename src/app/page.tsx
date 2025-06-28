import { MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-medium text-gray-700 mb-2">欢迎使用微信</h2>
        <p className="text-gray-500">请从左侧选择一个聊天开始对话</p>
      </div>
    </div>
  );
}
