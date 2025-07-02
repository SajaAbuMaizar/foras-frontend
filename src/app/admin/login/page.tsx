// src/app/admin/login/page.tsx

import LoginForm from "./components/LoginForm";
import InfoSection from "./components/InfoSection";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden">
        <div className="flex flex-col lg:flex-row" dir="rtl">
          {/* Form Section */}

          <LoginForm />

          {/* Image/Info Section */}
          <InfoSection />
        </div>
      </div>
    </div>
  );
}
