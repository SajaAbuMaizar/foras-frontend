import { Skeleton } from "@/components/ui/Skeleton";

export function NavbarSkeleton({
  variant = "default",
}: {
  variant?: "default" | "transparent";
}) {
  const bgClass =
    variant === "transparent"
      ? "bg-transparent"
      : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900";

  return (
    <header dir="rtl" className={`fixed top-0 z-[99999] w-full ${bgClass}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo skeleton */}
          <Skeleton
            variant="text"
            width={100}
            height={40}
            className={
              variant === "transparent" ? "bg-white/20" : "bg-white/10"
            }
          />

          {/* Desktop navigation skeleton */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-1 mr-8">
              {/* Nav items skeleton */}
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={120}
                  height={40}
                  className={`rounded-lg ${
                    variant === "transparent" ? "bg-white/20" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Auth section skeleton */}
            <div className="flex items-center space-x-4 mr-8">
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                className={`rounded-lg ${
                  variant === "transparent" ? "bg-white/20" : "bg-white/10"
                }`}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                className={`rounded-lg ${
                  variant === "transparent" ? "bg-white/20" : "bg-white/10"
                }`}
              />
            </div>
          </div>

          {/* Mobile menu button skeleton */}
          <div className="lg:hidden left-4 absolute">
            <Skeleton
              variant="rectangular"
              width={40}
              height={40}
              className={`rounded-lg ${
                variant === "transparent" ? "bg-white/20" : "bg-white/10"
              }`}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
