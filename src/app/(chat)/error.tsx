"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

interface ChatErrorProps {
  onRetry?: () => void;
  message?: string;
}

export function ChatError({
  onRetry,
  message = "获取聊天列表失败",
}: ChatErrorProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
        <div>
          <h3 className="text-lg font-medium text-foreground">出错了</h3>
          <p className="text-sm text-muted-foreground mt-1">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            重试
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
        <div>
          <h2 className="text-lg font-medium text-foreground">出错了</h2>
          <p className="text-sm text-muted-foreground mt-1">
            页面加载时发生了错误
          </p>
        </div>
        <Button onClick={reset} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          重试
        </Button>
      </div>
    </div>
  );
}
