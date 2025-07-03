"use client";

import Link from "next/link";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";
import {
  Home,
  Briefcase,
  Settings,
  User,
  Bell,
  Link as LinkIcon,
  ChevronDown,
  MessageSquare,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const t = useEmployerTranslations();
  const { lang } = useLanguage();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("employerToken");
    router.push("/employer/signin");
  };

  return (
    <aside
      className="w-64 mt-20 bg-white border-l border-gray-200 h-screen p-4 overflow-y-auto shadow-md rtl fixed right-0 top-0"
      dir="rtl"
    >
      {/* Brand */}
      <div className={`mb-6 ${lang === "ar" ? "mr-7" : "ml-7"}`}>
        <Link
          href="/employer/dashboard"
          className="text-4xl font-bold text-primary"
        >
          Foras
        </Link>
      </div>

      {/* Menu */}
      <ul className="space-y-2 text-xl">
        {/* Dashboard */}
        <li>
          <Link
            href="/employer/dashboard"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <Home className={`h-5 w-5 ${lang === "ar" ? "ml-3" : "mr-3"}`} />
            {t.dashboard.title}
          </Link>
        </li>

        {/* Post Job */}
        <li>
          <Link
            href="/employer/post-job"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <Briefcase
              className={`h-5 w-5 ${lang === "ar" ? "ml-3" : "mr-3"}`}
            />
            {t.postJobPage.title}
          </Link>
        </li>

        {/* Job Listings */}
        <li>
          <Link
            href="/employer/job-listings"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <BarChart3
              className={`h-5 w-5 ${lang === "ar" ? "ml-3" : "mr-3"}`}
            />
            {t.jobListingsPage.heading}
          </Link>
        </li>

        {/* Applicants */}
        <li>
          <Link
            href="/employer/applicants"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <Users className={`h-5 w-5 ${lang === "ar" ? "ml-3" : "mr-3"}`} />
            {t.applicants.title}
          </Link>
        </li>

        {/* Messages */}
        <li>
          <Link
            href="/employer/messages"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <MessageSquare
              className={`h-5 w-5 ${lang === "ar" ? "ml-3" : "mr-3"}`}
            />
            {t.messages.title}
          </Link>
        </li>

        {/* Header */}
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
                <Settings
                  className={`h-5 w-5 ${lang === "ar" ? "ml-3" : "mr-3"}`}
                />
                {t.settings.sections.account}
              </span>
              <ChevronDown
                className={`h-4 w-4 transform transition-transform ${
                  openMenu === "settings" ? "rotate-180" : ""
                }`}
              />
            </summary>
            <ul className={`mt-2 space-y-1 ${lang === "ar" ? "pr-4" : "pl-4"}`}>
              <li>
                <Link
                  href="/employer/profile"
                  className="flex items-center px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-600"
                >
                  <User
                    className={`h-4 w-4 ${lang === "ar" ? "ml-2" : "mr-2"}`}
                  />
                  {t.companyProfile.title}
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/notifications"
                  className="flex items-center px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-600"
                >
                  <Bell
                    className={`h-4 w-4 ${lang === "ar" ? "ml-2" : "mr-2"}`}
                  />
                  {t.settings.sections.notifications}
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/integrations"
                  className="flex items-center px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-600"
                >
                  <LinkIcon
                    className={`h-4 w-4 ${lang === "ar" ? "ml-2" : "mr-2"}`}
                  />
                  {t.settings.sections.integrations}
                </Link>
              </li>
            </ul>
          </details>
        </li>

        {/* Logout */}
        <li className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          >
            <LogOut className={`h-5 w-5 ${lang === "ar" ? "ml-3" : "mr-3"}`} />
            {t.auth.signOut}
          </button>
        </li>
      </ul>
    </aside>
  );
};
