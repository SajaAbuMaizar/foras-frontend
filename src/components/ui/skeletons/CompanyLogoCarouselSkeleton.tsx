import { Skeleton } from "@/components/ui/Skeleton";

export function CompanyLogoCarouselSkeleton() {
  return (
    <div className="relative w-full py-8">
      {/* Title skeleton */}
      <Skeleton
        variant="text"
        width={200}
        height={32}
        className="mx-auto mb-6"
      />

      <div className="relative flex items-center justify-center px-12">
        {/* Left arrow skeleton */}
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          className="absolute left-0 z-10"
        />

        {/* Logos container skeleton */}
        <div className="w-full overflow-hidden">
          <div className="flex items-center justify-start gap-6">
            {/* Logo skeletons */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex-shrink-0">
                <Skeleton
                  variant="circular"
                  width={70}
                  height={70}
                  className="shadow-[0_0_0_3px_white,0_0_0_6px_#e5e7eb]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow skeleton */}
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          className="absolute right-0 z-10"
        />
      </div>
    </div>
  );
}
