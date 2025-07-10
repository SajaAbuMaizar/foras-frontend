"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Home,
  Briefcase,
  MessageSquare,
  Filter,
  Settings,
  Bell,
  Users,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarSkeleton } from "@/components/ui/skeletons";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

interface MenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  label,
  icon,
  isActive,
}) => (
  <li>
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg transition-all",
        isActive
          ? "bg-blue-50 text-blue-700 font-medium border-r-4 border-blue-700"
          : "hover:bg-gray-100"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  </li>
);

const Sidebar: React.FC = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const menuItems: MenuItem[] = [
    { href: "/admin/dashboard", label: "לוח בקרה", icon: <Home size={20} /> },
    { href: "/admin/jobs", label: "משרות", icon: <Briefcase size={20} /> },
    {
      href: "/admin/messages",
      label: "הודעות",
      icon: <MessageSquare size={20} />,
    },
    {
      href: "/admin/filter",
      label: "סינון מועמדים",
      icon: <Filter size={20} />,
    },
  ];

  const accountItems: MenuItem[] = [
    { href: "/admin/account", label: "חשבון", icon: <Settings size={18} /> },
    { href: "/admin/notifications", label: "התראות", icon: <Bell size={18} /> },
    { href: "/admin/connections", label: "חיבורים", icon: <Users size={18} /> },
  ];

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full bg-white shadow-xl border-l border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">לוח ניהול</h2>

          <p className="text-sm text-gray-500 mt-1">מערכת ניהול משרות</p>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <SidebarLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={pathname === item.href}
              />
            ))}

            {/* Account Section */}
            <li className="pt-4 border-t border-gray-200 mt-6">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
              >
                <span className="flex items-center gap-3">
                  <User size={20} />
                  <span>ניהול חשבון</span>
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform",
                    isAccountOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown Items */}
              {isAccountOpen && (
                <ul className="mt-2 space-y-1 pr-4">
                  {accountItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-100 transition-all",
                          pathname === item.href && "bg-gray-100 text-gray-900"
                        )}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
