// src/app/employer/signup/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { employerSignupSchema } from "@/schemas/employerSignupSchema";
import { apiClient } from "@/lib/api-client";
import toast from "react-hot-toast";
import { useTermsModal } from "@/hooks/useTermsModal";
import TermsModal from "@/components/modals/TermsModal";
import { useLanguage } from "@/context/language/LanguageContext";
import ar from "@/translations/ar";
import he from "@/translations/he";
import {
  Mail,
  Lock,
  User,
  Building,
  Phone,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

type FormData = yup.InferType<typeof employerSignupSchema>;

interface ApiError {
  field?: "phone" | "email" | "general";
  message: string;
}

const EmployerSignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const { lang } = useLanguage();
  const t = lang === "ar" ? ar.signupPage : he.signupPage;
  const termsModal = useTermsModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(employerSignupSchema),
  });

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    setIsLoading(true);

    try {
      await apiClient.withRetry(
        () => apiClient.post("/api/auth/employer/signup", data),
        {
          retries: 2,
          retryCondition: (error) => {
            return !error.response || error.response.status >= 500;
          },
        }
      );

      toast.success("تم إنشاء الحساب بنجاح!");
      window.location.href = "/employer/dashboard";
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "حدث خطأ أثناء التسجيل";

      // Handle specific error types
      if (
        error?.response?.status === 409 ||
        errorMessage.includes("الهاتف") ||
        errorMessage.includes("مستخدم")
      ) {
        setApiError({
          field: "phone",
          message: "رقم الهاتف مسجل بالفعل. يرجى استخدام رقم آخر",
        });
        setError("phone", {
          type: "manual",
          message: "رقم الهاتف مسجل بالفعل",
        });
      } else if (
        errorMessage.includes("البريد") ||
        errorMessage.includes("email")
      ) {
        setApiError({
          field: "email",
          message: "البريد الإلكتروني مسجل بالفعل",
        });
        setError("email", {
          type: "manual",
          message: "البريد الإلكتروني مسجل بالفعل",
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
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Form Section */}
          <div className="p-8 lg:p-12">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Building className="h-12 w-12 text-blue-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
              {t.title}
            </h1>
            <p className="text-center text-gray-600 mb-8">
              أنشئ حساب صاحب عمل للبدء في التوظيف
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder={t.form.namePlaceholder}
                    className={`w-full pr-10 pl-3 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Company Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم الشركة
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("companyName")}
                    type="text"
                    placeholder={t.form.companyNamePlaceholder}
                    className={`w-full pr-10 pl-3 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      errors.companyName
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder={t.form.emailPlaceholder}
                    className={`w-full pr-10 pl-3 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      errors.email || apiError?.field === "email"
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                    }`}
                  />
                </div>
                {(errors.email || apiError?.field === "email") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email?.message || apiError?.message}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder={t.form.phonePlaceholder}
                    className={`w-full pr-10 pl-3 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      errors.phone || apiError?.field === "phone"
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                    }`}
                  />
                </div>
                {(errors.phone || apiError?.field === "phone") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone?.message || apiError?.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder={t.form.passwordPlaceholder}
                    className={`w-full pr-10 pl-10 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      errors.password
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
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t.form.confirmPasswordPlaceholder}
                    className={`w-full pr-10 pl-10 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register("agreeTerms")}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="mr-3 text-sm">
                  <label className="text-gray-700">
                    {t.form.agreeTermsText}{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                      onClick={termsModal.open}
                    >
                      {t.form.termsButtonText}
                    </button>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-sm mt-1">
                      {t.form.termsError}
                    </p>
                  )}
                </div>
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
                    جاري إنشاء الحساب...
                  </span>
                ) : (
                  t.form.submitButton
                )}
              </button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-gray-600">
                {t.sideImage.loginTextBeforeLink}{" "}
                <Link
                  href="/employer/signin"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {t.sideImage.loginLinkText}
                </Link>
              </p>
            </form>
          </div>

          {/* Side Panel */}
          <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-indigo-700 p-12 items-center justify-center relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">{t.sideImage.heading}</h2>
              <p className="text-lg mb-8 opacity-90">
                {t.sideImage.description}
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 ml-3 flex-shrink-0" />
                  <span className="text-right">نشر وظائف غير محدودة</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 ml-3 flex-shrink-0" />
                  <span className="text-right">
                    الوصول إلى آلاف المرشحين المؤهلين
                  </span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 ml-3 flex-shrink-0" />
                  <span className="text-right">
                    أدوات إدارة التوظيف المتقدمة
                  </span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 ml-3 flex-shrink-0" />
                  <span className="text-right">تحليلات ورؤى مفصلة</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/employer/signin"
                  className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="ml-2 h-5 w-5" />
                  العودة إلى تسجيل الدخول
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TermsModal isOpen={termsModal.isOpen} onClose={termsModal.close} />
    </div>
  );
};

export default EmployerSignupPage;
