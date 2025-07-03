"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Lock, Building2, Users, BarChart3 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSignin } from "@/hooks/useEmployerSignin";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const EmployerSignInPage = () => {
  const router = useRouter();
  const t = useEmployerTranslations();
  const { lang } = useLanguage();
  const { onSubmit, isLoading } = useSignin();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit({
        phone: formData.phone,
        password: formData.password,
      });

      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      toast.success(t.auth.welcomeBack);
      router.push("/employer/dashboard");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      if (errorMessage.includes("Invalid credentials")) {
        toast.error(t.signinPage.errors.invalidCredentials);
      } else if (error.response?.status >= 500) {
        toast.error(t.signinPage.errors.serverError);
      } else {
        toast.error(t.signinPage.errors.networkError);
      }
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

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder={t.signinPage.form.phonePlaceholder}
                    />
                  </div>
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
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder={t.signinPage.form.passwordPlaceholder}
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rememberMe: e.target.checked,
                        })
                      }
                      className={`${
                        lang === "ar" ? "ml-2" : "mr-2"
                      } h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded`}
                    />
                    <span className="text-sm text-gray-700">
                      {t.signinPage.form.rememberMe}
                    </span>
                  </label>
                  <Link
                    href="/employer/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {t.signinPage.form.forgotPassword}
                  </Link>
                </div>

                {/* Submit Button */}
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
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
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
                <p className="text-center text-sm text-gray-600">
                  {t.signinPage.noAccount}{" "}
                  <Link
                    href="/employer/signup"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {t.signinPage.createAccount}
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 items-center justify-center relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">
                {t.signinPage.imageSection.title}
              </h3>
              <p className="text-lg mb-8 opacity-90">
                {t.signinPage.imageSection.subtitle}
              </p>
              <div className="space-y-4">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <Users
                    className={`h-6 w-6 ${lang === "ar" ? "ml-3" : "mr-3"}`}
                  />
                  <span>{t.signinPage.imageSection.features.candidates}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <Building2
                    className={`h-6 w-6 ${lang === "ar" ? "ml-3" : "mr-3"}`}
                  />
                  <span>{t.signinPage.imageSection.features.tools}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <BarChart3
                    className={`h-6 w-6 ${lang === "ar" ? "ml-3" : "mr-3"}`}
                  />
                  <span>{t.signinPage.imageSection.features.support}</span>
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
