// src/components/ui/Skeleton.tsx
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave";
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  animation = "pulse",
  ...props
}: SkeletonProps) {
  const animationClass =
    animation === "pulse"
      ? "animate-pulse"
      : "animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";

  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
  };

  return (
    <div
      className={cn(
        animation === "pulse" ? "bg-gray-200" : "",
        animationClass,
        variantClasses[variant],
        className
      )}
      style={{
        width: width || "100%",
        height: height || (variant === "text" ? "1em" : "100%"),
      }}
      {...props}
    />
  );
}

// Job Card Skeleton
export function JobCardSkeleton() {
  return (
    <div className="shadow-lg w-[333px] rounded-[30px] border border-gray-200 overflow-hidden">
      <Skeleton variant="rectangular" height={180} />
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="text" width={100} />
        </div>
        <Skeleton variant="text" className="mb-2" />
        <Skeleton variant="text" width="60%" className="mb-4" />
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={80} height={32} />
          <Skeleton variant="rectangular" width={80} height={32} />
        </div>
      </div>
    </div>
  );
}

// Table Row Skeleton with better styling
export function TableRowSkeleton({ columns = 7 }: { columns?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );
}

// Enhanced Table Skeleton with different column widths
export function EnhancedTableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      {/* Title column - wider */}
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </td>
      {/* City column - medium */}
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      {/* Description column - full width */}
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </td>
      {/* Salary column - short */}
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      {/* More info button */}
      <td className="px-6 py-4">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </td>
      {/* Boost button */}
      <td className="px-6 py-4">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </td>
      {/* Status badge */}
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
      </td>
    </tr>
  );
}

// Profile Card Skeleton
export function ProfileCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <Skeleton
        variant="circular"
        width={144}
        height={144}
        className="mx-auto"
      />
      <Skeleton
        variant="text"
        width={120}
        height={24}
        className="mx-auto mt-4"
      />
      <Skeleton
        variant="text"
        width={100}
        height={20}
        className="mx-auto mt-2"
      />
      <Skeleton
        variant="text"
        width={80}
        height={20}
        className="mx-auto mt-1"
      />
      <Skeleton
        variant="rectangular"
        width={80}
        height={36}
        className="mx-auto mt-4"
      />
    </div>
  );
}

// Form Skeleton
export function FormSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <Skeleton variant="text" width={100} height={16} className="mb-2" />
          <Skeleton variant="rectangular" height={40} />
        </div>
      ))}
      <Skeleton
        variant="rectangular"
        height={40}
        width={120}
        className="mt-6"
      />
    </div>
  );
}
