// src/app/employer/signin/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api-client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/language/LanguageContext";
import { translations } from "@/translations";
import { Phone, Lock, Eye, EyeOff, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const signinSchema = z.object({
  phone: z.string().min(10, "يجب أن يتكون رقم الهاتف من 10 أرقام على الأقل"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

type SigninFormData = z.infer<typeof signinSchema>;

interface ApiError {
  field?: "phone" | "password" | "general";
  message: string;
}

export default function EmployerSigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const { lang } = useLanguage();
  const t = translations[lang].signinPage;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    setApiError(null);
    setIsLoading(true);

    try {
      await apiClient.withRetry(() =>
        apiClient.post("/api/auth/employer/signin", data)
      );

      toast.success("تم تسجيل الدخول بنجاح!");
      window.location.href = "/employer/dashboard";
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "خطأ غير معروف";

      // Handle specific error types
      if (
        error?.response?.status === 404 ||
        errorMessage.includes("غير مسجل") ||
        errorMessage.includes("غير موجود")
      ) {
        setApiError({
          field: "phone",
          message: "رقم الهاتف غير مسجل. يرجى التسجيل أولاً",
        });
        setError("phone", {
          type: "manual",
          message: "رقم الهاتف غير مسجل",
        });
      } else if (
        error?.response?.status === 401 ||
        errorMessage.includes("كلمة المرور") ||
        errorMessage.includes("خاطئة")
      ) {
        setApiError({
          field: "password",
          message: "كلمة المرور غير صحيحة",
        });
        setError("password", {
          type: "manual",
          message: "كلمة المرور غير صحيحة",
        });
      } else {
        setApiError({
          field: "general",
          message: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="absolute top-4">
        <LanguageSwitcher />
      </div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <div className="flex flex-col md:flex-row" dir="rtl">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Building2 className="h-12 w-12 text-blue-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              {t.title}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              مرحباً بعودتك إلى منصة التوظيف
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* API Error Display */}
              {apiError && apiError.field === "general" && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {apiError.message}
                </div>
              )}

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="05XXXXXXXX"
                    className={`w-full pr-10 pl-3 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      errors.phone || apiError?.field === "phone"
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                    }`}
                  />
                </div>
                {(errors.phone || apiError?.field === "phone") && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.phone?.message || apiError?.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full pr-10 pl-10 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      errors.password || apiError?.field === "password"
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {(errors.password || apiError?.field === "password") && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password?.message || apiError?.message}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-left">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  نسيت كلمة المرور؟
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-medium text-white transition-all transform ${
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
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  "تسجيل الدخول"
                )}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600">
                ليس لديك حساب؟{" "}
                <Link
                  href="/employer/signup"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  سجل الآن
                </Link>
              </p>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 items-center justify-center relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">ابحث عن أفضل المواهب</h3>
              <p className="text-lg mb-8 opacity-90">
                انضم إلى آلاف الشركات التي تستخدم منصتنا للعثور على الموظفين
                المثاليين
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mx-auto max-w-sm">
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <div className="text-center">
                    <div className="text-3xl font-bold">5000+</div>
                    <div className="text-sm opacity-90">شركة نشطة</div>
                  </div>
                  <div className="w-px h-12 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-sm opacity-90">توظيف ناجح</div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/employer/signup"
                  className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  إنشاء حساب جديد
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
