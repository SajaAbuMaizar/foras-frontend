// src/app/admin/(auth)/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const pathname = usePathname();

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

  return (
    <aside className="h-full bg-white shadow-xl border-l border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">לוח ניהול</h2>
          <p className="text-sm text-gray-500 mt-1">מערכת ניהול Foras</p>
        </div>

        {/* Main Navigation */}
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
          </ul>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200" />

          {/* Apps & Pages Section */}
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            אפליקציות ודפים
          </p>

          {/* Account Settings Collapsible */}
          <li className="list-none">
            <button
              onClick={() => setIsAccountOpen((prev) => !prev)}
              className={cn(
                "flex items-center justify-between w-full px-4 py-3 text-left rounded-lg transition-all",
                "hover:bg-gray-100 text-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <Settings size={20} />
                <span>הגדרות חשבון</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform text-gray-400",
                  isAccountOpen && "rotate-180"
                )}
              />
            </button>

            {isAccountOpen && (
              <ul className="mt-2 mr-4 space-y-1">
                {accountItems.map((item) => (
                  <SidebarLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    isActive={pathname === item.href}
                  />
                ))}
              </ul>
            )}
          </li>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  מנהל מערכת
                </p>
                <p className="text-xs text-gray-500">admin@foras.co.il</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
