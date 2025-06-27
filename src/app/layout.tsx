// app/layout.tsx

//export const dynamic = "force-dynamic"; // <-- THIS IS THE MAGIC

import "@/styles/globals.css";
import AuthProviderWrapper from "@/context/auth/AuthProviderWrapper";
import { LanguageProvider } from "@/context/language/LanguageContext";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { cookies } from "next/headers";

export const metadata = {
  title: "Foras | Job Portal",
  description: "وظائف وفرص عمل في القدس",
  icons: {
    icon: "/favicon.ico",
  },
};

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
        <LanguageProvider initialLang={lang}>
          <AuthProviderWrapper>
            {children}
            <ToastProvider />
          </AuthProviderWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
