import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function ChatSkeleton() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* 头部骨架 */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center">
        <div className="mr-3 p-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex items-center">
          <Skeleton className="ml-3 h-6 w-32" />
        </div>
      </div>

      {/* 消息列表骨架 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* 模拟对方消息 */}
        <div className="flex justify-start">
          <div className="max-w-xs lg:max-w-md xl:max-w-lg bg-card border border-border rounded-lg px-4 py-2 shadow-sm">
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-4 w-48 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* 模拟自己的消息 */}
        <div className="flex justify-end">
          <div className="max-w-xs lg:max-w-md xl:max-w-lg bg-primary/10 rounded-lg px-4 py-2 shadow-sm">
            <Skeleton className="h-4 w-36 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* 模拟对方消息 */}
        <div className="flex justify-start">
          <div className="max-w-xs lg:max-w-md xl:max-w-lg bg-card border border-border rounded-lg px-4 py-2 shadow-sm">
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* 模拟自己的消息 */}
        <div className="flex justify-end">
          <div className="max-w-xs lg:max-w-md xl:max-w-lg bg-primary/10 rounded-lg px-4 py-2 shadow-sm">
            <Skeleton className="h-4 w-52 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>

      {/* 输入区域骨架 */}
      <div className="bg-card border-t border-border px-4 py-3">
        <div className="flex items-end space-x-3 items-stretch">
          <div className="flex-1">
            <Skeleton className="w-full h-10 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
