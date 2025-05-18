// src/app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Foras | تسجيل دخول المشغل',
  description: 'منصة فوراس لتوظيف وتشغيل الشباب',
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
