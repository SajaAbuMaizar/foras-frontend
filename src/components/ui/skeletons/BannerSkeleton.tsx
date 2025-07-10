import { Skeleton } from "@/components/ui/Skeleton";

export function BannerSkeleton() {
  return (
    <div className="relative h-[500px] w-full bg-gray-200 animate-pulse">
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300" />

      {/* Content skeleton */}
      <div className="absolute top-1/2 left-[45%] -translate-x-[15%] -translate-y-[45%] z-20">
        {/* Title skeleton */}
        <Skeleton
          variant="rectangular"
          width={400}
          height={40}
          className="mb-10 mx-auto"
        />

        {/* Form skeleton */}
        <div className="flex xl:flex-row flex-col gap-3 items-center">
          {/* City select skeleton */}
          <Skeleton
            variant="rectangular"
            width={200}
            height={56}
            className="rounded-lg xl:w-[170px]"
          />

          {/* Industry select skeleton */}
          <Skeleton
            variant="rectangular"
            width={200}
            height={56}
            className="rounded-lg xl:w-[170px]"
          />

          {/* Hebrew checkbox skeleton */}
          <Skeleton
            variant="rectangular"
            width={200}
            height={56}
            className="rounded-lg xl:w-[170px]"
          />

          {/* Transportation checkbox skeleton */}
          <Skeleton
            variant="rectangular"
            width={200}
            height={56}
            className="rounded-lg xl:w-[170px]"
          />

          {/* Submit button skeleton */}
          <Skeleton
            variant="rectangular"
            width={120}
            height={56}
            className="rounded-full xl:w-[150px]"
          />
        </div>
      </div>
    </div>
  );
}
