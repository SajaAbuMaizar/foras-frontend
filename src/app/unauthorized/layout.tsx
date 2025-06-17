// app/layout.tsx
import "@/styles/globals.css";

export const metadata = {
  title: 'Foras',
  description: 'Job Portal Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-poppin antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
