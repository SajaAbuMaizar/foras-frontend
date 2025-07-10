import { Skeleton } from "@/components/ui/Skeleton";

export function MessageItemSkeleton() {
  return (
    <div className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-3">
        {/* Avatar skeleton */}
        <Skeleton variant="circular" width={48} height={48} />

        {/* Content skeleton */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="text" width={60} height={16} />
          </div>
          <Skeleton variant="text" width="100%" height={16} className="mb-1" />
          <Skeleton variant="text" width="80%" height={16} />
        </div>
      </div>
    </div>
  );
}
