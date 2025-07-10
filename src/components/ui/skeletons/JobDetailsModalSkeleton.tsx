import { Skeleton } from "@/components/ui/Skeleton";

export function JobDetailsModalSkeleton() {
  return (
    <div className="w-full max-w-4xl">
      {/* Header Image skeleton */}
      <div className="relative h-64 mb-6">
        <Skeleton variant="rectangular" height={256} className="rounded-t-lg" />
        {/* Company Logo skeleton */}
        <div className="absolute bottom-4 right-4">
          <Skeleton
            variant="circular"
            width={80}
            height={80}
            className="border-4 border-white"
          />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-6">
        {/* Title skeleton */}
        <div>
          <Skeleton variant="text" width={300} height={36} className="mb-2" />
          <Skeleton variant="text" width={200} height={24} />
        </div>

        {/* Key Information Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton
                variant="rectangular"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div className="flex-1">
                <Skeleton
                  variant="text"
                  width={60}
                  height={16}
                  className="mb-1"
                />
                <Skeleton variant="text" width={120} height={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Description skeleton */}
        <div>
          <Skeleton variant="text" width={150} height={28} className="mb-3" />
          <div className="space-y-2">
            <Skeleton variant="text" height={16} />
            <Skeleton variant="text" height={16} />
            <Skeleton variant="text" height={16} width="80%" />
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex gap-3 pt-4">
          <Skeleton
            variant="rectangular"
            width={150}
            height={48}
            className="rounded-lg"
          />
          <Skeleton
            variant="rectangular"
            width={150}
            height={48}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
