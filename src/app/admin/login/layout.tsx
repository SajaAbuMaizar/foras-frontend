// src/app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Foras | تسجيل دخول ',
  description: 'منصة فوراس لتوظيف وتشغيل الشباب',
};

export default function AdminLogInLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
