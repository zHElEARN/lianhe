import { MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center">
        <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-medium text-foreground mb-2">
          欢迎使用微信
        </h2>
        <p className="text-muted-foreground">请从左侧选择一个聊天开始对话</p>
      </div>
    </div>
  );
}
