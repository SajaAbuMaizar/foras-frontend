// src/app/layout.tsx
import "@/styles/globals.css";
import AuthProviderWrapper from "@/context/auth/AuthProviderWrapper";
import ClientProviders from "@/components/ClientProviders";
import { cookies } from "next/headers";
import { generateSEOMetadata } from "@/components/SEO/SEO";

export const metadata = generateSEOMetadata({
  title: "وظائف في القدس - فرص عمل متميزة",
  description:
    "ابحث عن أفضل الوظائف في القدس والمناطق المحيطة. وظائف بدوام كامل وجزئي في جميع المجالات.",
  keywords: ["وظائف", "القدس", "فرص عمل", "توظيف", "وظائف عربية"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "he" ? "he" : "ar";

  return (
    <html lang={lang}>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <AuthProviderWrapper>
          <ClientProviders initialLang={lang}>{children}</ClientProviders>
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
