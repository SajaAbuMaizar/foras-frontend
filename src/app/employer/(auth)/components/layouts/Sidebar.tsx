'use client";'

import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="w-64 mt-20 bg-white border-l border-gray-200 h-screen p-4 overflow-y-auto shadow-md rtl fixed right-0 top-0">
      {/* Brand */}
      <div className="mb-6 mr-7">
        <Link href="/employer/dashboard" className="text-4xl font-bold text-primary">
          Foras
        </Link>
      </div>

      {/* Menu */}
      <ul className="space-y-2 text-xl">
        {/* Dashboard */}
        <li>
          <Link
            href="/employer/dashboard"
            className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            الصفحة الرئيسية
          </Link>
        </li>

        {/* Post Job */}
        <li>
          <Link
            href="/employer/post-job"
            className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            نشر وظيفة
          </Link>
        </li>

        {/* Header */}
        <li className="mt-6 text-xs font-semibold text-gray-400 uppercase">
          تطبيقات وصفحات
        </li>

        {/* Account Settings Menu */}
        <li>
          <details className="group">
            <summary className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 flex justify-between items-center">
              <span>إعدادات الحساب</span>
              <span className="transform transition-transform group-open:rotate-180">▾</span>
            </summary>
            <ul className="mt-2 space-y-1 ps-4">
              <li>
                <Link
                  href="/employer/account"
                  className="block px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-600"
                >
                  الحساب
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/notifications"
                  className="block px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-600"
                >
                  الإشعارات
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/connections"
                  className="block px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-600"
                >
                  الاتصالات
                </Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  );
};
