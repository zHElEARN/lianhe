import { Skeleton } from "@/components/ui/skeleton";

export function ChatListSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center p-4 border-b border-border"
        >
          <div className="flex-shrink-0">
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>

          <div className="ml-3 flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
