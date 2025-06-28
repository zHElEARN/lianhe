"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ChatErrorProps {
  error: string;
  onRetry?: () => void;
}

export default function ChatError({ error, onRetry }: ChatErrorProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center p-6 max-w-md">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">加载失败</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            重试
          </Button>
        )}
      </div>
    </div>
  );
}

export function ChatNotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center p-6 max-w-md">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          聊天记录不存在
        </h2>
        <p className="text-muted-foreground">
          找不到指定的聊天记录，请检查链接是否正确。
        </p>
      </div>
    </div>
  );
}
