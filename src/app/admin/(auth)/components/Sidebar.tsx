'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // helper for conditional classnames

type SidebarLinkProps = {
  href: string;
  label: string;
};

const SidebarLink = ({ href, label }: SidebarLinkProps) => (
  <li>
    <Link
      href={href}
      className="block px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition"
    >
      {label}
    </Link>
  </li>
);

export default function Sidebar() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <aside className="bg-white shadow-xl w-64 min-h-screen px-4 py-6 border-r mt-20 z-0">

      {/* Navigation */}
      <ul className="space-y-3 text-xl font-medium text-gray-600">
        <SidebarLink href="/admin/dashboard" label="דף הבית" />
        <SidebarLink href="/admin/jobs" label="משרות" />
        <SidebarLink href="/admin/messages" label="הודעות" />
        <SidebarLink href="/admin/filter" label="שירותי סינון" />

        <li className="pt-6 text-base font-semibold text-gray-500 uppercase">Apps & Pages</li>

        {/* Account Settings Collapsible */}
        <li>
          <button
            onClick={() => setIsAccountOpen((prev) => !prev)}
            className="flex items-center justify-between w-full px-6 py-3 text-left hover:bg-gray-100 rounded-md transition text-lg"
          >
            <span>Account Settings</span>
            <ChevronDown
              className={cn(
                'h-5 w-5 transition-transform',
                isAccountOpen && 'rotate-180'
              )}
            />
          </button>

          {isAccountOpen && (
            <ul className="mt-1 ml-4 space-y-1 text-base text-gray-600">
              <SidebarLink href="/admin/account" label="Account" />
              <SidebarLink href="/admin/notifications" label="Notifications" />
              <SidebarLink href="/admin/connections" label="Connections" />
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}