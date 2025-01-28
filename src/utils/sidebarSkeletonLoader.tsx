import { cn } from "@/lib/utils";

export function ConversationSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-4 p-4", className)}>
      {/* Title skeleton */}
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-neutral-800 rounded animate-pulse w-3/4"></div>
        <div className="h-3 bg-neutral-800/50 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  );
}

export function ConversationsLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <ConversationSkeleton key={i} />
      ))}
    </div>
  );
}
