"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Lock,
  Building2,
  Users,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useSignin } from "@/hooks/useEmployerSignin";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useEmployerSignup } from "@/hooks/useEmployerSignup";

const EmployerSignInPage = () => {
  const router = useRouter();
  const t = useEmployerTranslations();
  const { lang } = useLanguage();
  const {
    register,
    handleSubmit,
    onSubmit,
    clearError,
    errors,
    isLoading,
    apiError,
  } = useSignin();
  const [rememberMe, setRememberMe] = useState(false);

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="flex-1 p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t.signinPage.title}
              </h1>
              <p className="text-gray-600 mb-8">{t.signinPage.subtitle}</p>

              {/* General Error Alert */}
              {apiError?.field === "general" && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800 font-medium">
                      {apiError.message}
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-6"
              >
                {/* Phone Input */}
                <div>
                  <div className="relative">
                    <Phone
                      className={`absolute top-3 ${
                        lang === "ar" ? "right-3" : "left-3"
                      } h-5 w-5 text-gray-400`}
                    />
                    <input
                      type="tel"
                      {...register("phone", {
                        onChange: () => clearError("phone"), // Clear phone error when typing
                      })}
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.phone || apiError?.field === "phone"
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } rounded-lg focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder={t.signinPage.form.phonePlaceholder}
                    />
                  </div>
                  {(errors.phone || apiError?.field === "phone") && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone?.message || apiError?.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="relative">
                    <Lock
                      className={`absolute top-3 ${
                        lang === "ar" ? "right-3" : "left-3"
                      } h-5 w-5 text-gray-400`}
                    />
                    <input
                      type="password"
                      {...register("password")}
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.password || apiError?.field === "password"
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } rounded-lg focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder={t.signinPage.form.passwordPlaceholder}
                    />
                  </div>
                  {(errors.password || apiError?.field === "password") && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password?.message || apiError?.message}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {t.signinPage.form.rememberMe}
                    </span>
                  </label>
                  <Link
                    href="/employer/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {t.signinPage.form.forgotPassword}
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 transform ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-[0.98]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0"
                        viewBox="0 0 24 24"
                      >
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
                      {t.signinPage.form.submitting}
                    </span>
                  ) : (
                    t.signinPage.form.submitButton
                  )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600">
                  {t.signinPage.noAccount}{" "}
                  <Link
                    href="/employer/signup"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {t.signinPage.createAccount}
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden md:block flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-12">
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t.signinPage.imageSection.title}
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                {t.signinPage.imageSection.subtitle}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">
                    {t.signinPage.imageSection.features.candidates}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">
                    {t.signinPage.imageSection.features.tools}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">
                    {t.signinPage.imageSection.features.support}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignInPage;
