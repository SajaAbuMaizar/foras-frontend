"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Users,
  MessageSquare,
  Settings,
  ChevronDown,
  Plus,
  User,
  Bell,
  CreditCard,
} from "lucide-react";
import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { SidebarSkeleton } from "@/components/ui/skeletons";

export function Sidebar() {
  const { lang } = useLanguage();
  const t = useEmployerTranslations();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<"settings" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = (menu: "settings") => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  if (isLoading) {
    return (
      <div className="fixed right-0 top-0 h-full w-64 pt-20">
        <SidebarSkeleton />
      </div>
    );
  }

  return (
    <aside
      className={`fixed right-0
      } top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 pt-20`}
      dir="rtl"
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link
              href="/employer/dashboard"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <Home className={`h-5 w-5 mr-3`} />
              {t.dashboard.title}
            </Link>
          </li>

          {/* Create Job */}
          <li>
            <Link
              href="/employer/post-job"
              className="flex items-center px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Plus className={`h-5 w-5 mr-3`} />
              {t.postJobPage.title}
            </Link>
          </li>

          {/* Jobs */}
          <li>
            <Link
              href="/employer/jobs"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <FileText className={`h-5 w-5 mr-3`} />
              {t.jobListingsPage.heading}
            </Link>
          </li>

          {/* Applicants */}
          <li>
            <Link
              href="/employer/applicants"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <Users className={`h-5 w-5 mr-3`} />
              {t.applicants.title}
            </Link>
          </li>

          {/* Messages */}
          <li>
            <Link
              href="/employer/messages"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <MessageSquare className={`h-5 w-5 mr-3`} />
              {t.messages.title}
            </Link>
          </li>

          {/* Settings Section */}
          <li className="mt-6 text-xs font-semibold text-gray-400 uppercase">
            {t.settings.title}
          </li>

          {/* Account Settings Menu */}
          <li>
            <details className="group" open={openMenu === "settings"}>
              <summary
                className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 flex justify-between items-center"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("settings");
                }}
              >
                <span className="flex items-center">
                  <Settings className={`h-5 w-5 mr-3`} />
                  {t.settings.sections.account}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transform transition-transform ${
                    openMenu === "settings" ? "rotate-180" : ""
                  }`}
                />
              </summary>
              <ul className={`mt-2 space-y-1 pl-4`}>
                <li>
                  <Link
                    href="/employer/profile"
                    className="flex items-center px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-600"
                  >
                    <User className={`h-4 w-4 mr-2`} />
                    {t.companyProfile.title}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/notifications"
                    className="flex items-center px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-600"
                  >
                    <Bell className={`h-4 w-4 mr-2`} />
                    {t.settings.sections.notifications}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/billing"
                    className="flex items-center px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-600"
                  >
                    <CreditCard className={`h-4 w-4 mr-2`} />
                    {t.settings.sections.billing}
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
