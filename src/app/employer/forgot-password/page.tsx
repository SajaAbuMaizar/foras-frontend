"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { requestPasswordReset } from "@/lib/api/employer-auth";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const t = useEmployerTranslations();
  const { lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await requestPasswordReset({
        phone,
        userType: "employer",
      });

      if (response.success) {
        setIsSuccess(true);
        toast.success(t.forgotPasswordPage.success.title);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error(t.forgotPasswordPage.errors.phoneNotFound);
      } else {
        toast.error(t.forgotPasswordPage.errors.sendFailed);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t.forgotPasswordPage.success.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {t.forgotPasswordPage.success.message}
            </p>
            <Link
              href="/employer/signin"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft
                className={`${lang === "ar" ? "ml-2" : "mr-2"} h-5 w-5`}
              />
              {t.forgotPasswordPage.backToLogin}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          {t.forgotPasswordPage.title}
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          {t.forgotPasswordPage.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <Phone
                className={`absolute top-3 ${
                  lang === "ar" ? "right-3" : "left-3"
                } h-5 w-5 text-gray-400`}
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full ${
                  lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                } py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder={t.forgotPasswordPage.form.phonePlaceholder}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-[0.98]"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t.forgotPasswordPage.form.submitting}
              </span>
            ) : (
              t.forgotPasswordPage.form.submitButton
            )}
          </button>

          <p className="text-center">
            <Link
              href="/employer/signin"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft
                className={`${lang === "ar" ? "ml-2" : "mr-2"} h-5 w-5`}
              />
              {t.forgotPasswordPage.backToLogin}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
