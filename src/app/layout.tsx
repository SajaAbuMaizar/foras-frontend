// app/layout.tsx
import "@/styles/globals.css"; // Tailwind CSS
import AuthProviderWrapper from "@/context/auth/AuthProviderWrapper";
import { LanguageProvider } from "@/context/language/LanguageContext";
import { ToastProvider } from "@/components/ui/ToastProvider";

export const metadata = {
  title: "Foras | Job Portal",
  description: "وظائف وفرص عمل في القدس",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <LanguageProvider>
          <AuthProviderWrapper>
            {children}
            <ToastProvider />
          </AuthProviderWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
