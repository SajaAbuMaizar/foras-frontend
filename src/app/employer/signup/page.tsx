"use client";

import EmployerSignupForm from "./components/EmployerSignupForm";
import SignupSideImage from "./components/SignupSideImage";
import { useLanguage } from "@/context/language/LanguageContext";
import ar from "@/translations/ar";
import he from "@/translations/he";

const EmployerSignupPage = () => {
  const { lang } = useLanguage();
  const t = lang === "ar" ? ar.signupPage : he.signupPage;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4" dir="rtl">
      <div className="bg-white rounded-xl shadow-md w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">{t.title}</h1>
          <EmployerSignupForm />
        </div>
        <SignupSideImage />
      </div>
    </div>
  );
};

export default EmployerSignupPage;
