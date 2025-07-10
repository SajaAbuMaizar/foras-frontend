import { Skeleton } from "@/components/ui/Skeleton";

export function SidebarSkeleton() {
  return (
    <aside className="h-full bg-white shadow-xl border-l border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Logo/Brand skeleton */}
        <div className="mb-8">
          <Skeleton variant="text" width={120} height={32} className="mb-2" />
          <Skeleton variant="text" width={150} height={16} />
        </div>

        {/* Navigation skeleton */}
        <nav>
          <ul className="space-y-2">
            {/* Main menu items */}
            {[1, 2, 3, 4].map((i) => (
              <li key={i}>
                <Skeleton
                  variant="rectangular"
                  height={48}
                  className="rounded-lg"
                />
              </li>
            ))}

            {/* Account dropdown skeleton */}
            <li className="pt-4 border-t border-gray-200 mt-6">
              <Skeleton
                variant="rectangular"
                height={48}
                className="rounded-lg mb-2"
              />
              {/* Dropdown items */}
              <div className="pr-4 space-y-1">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    height={36}
                    className="rounded"
                  />
                ))}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
