import { Skeleton } from "@/components/ui/Skeleton";

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton variant="text" width={60} height={16} />
          </div>
          <Skeleton variant="text" width={80} height={32} className="mb-2" />
          <Skeleton variant="text" width={100} height={16} />
        </div>
      ))}
    </div>
  );
}
