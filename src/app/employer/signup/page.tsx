"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEmployerSignup } from "@/hooks/useEmployerSignup";
import {
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import TermsModal from "@/components/modals/TermsModal";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const EmployerSignupPage = () => {
  const t = useEmployerTranslations();
  const { lang } = useLanguage();
  const termsModal = useDisclosure();
  const { formMethods, onSubmit, isLoading, apiError } = useEmployerSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = formMethods;


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="flex-1 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t.signupPage.title}
              </h1>
              <p className="text-gray-600 mb-8">{t.signupPage.subtitle}</p>

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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Input */}
                <div>
                  <div className="relative">
                    <User
                      className={`absolute top-3 ${
                        lang === "ar" ? "right-3" : "left-3"
                      } h-5 w-5 text-gray-400`}
                    />
                    <input
                      type="text"
                      {...register("name")}
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } rounded-lg focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder={t.signupPage.form.namePlaceholder}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Company Name Input */}
                <div>
                  <div className="relative">
                    <Building2
                      className={`absolute top-3 ${
                        lang === "ar" ? "right-3" : "left-3"
                      } h-5 w-5 text-gray-400`}
                    />
                    <input
                      type="text"
                      {...register("companyName")}
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.companyName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } rounded-lg focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder={t.signupPage.form.companyNamePlaceholder}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <div className="relative">
                    <Mail
                      className={`absolute top-3 ${
                        lang === "ar" ? "right-3" : "left-3"
                      } h-5 w-5 text-gray-400`}
                    />
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.email || apiError?.field === "email"
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } rounded-lg focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder={t.signupPage.form.emailPlaceholder}
                    />
                  </div>
                  {(errors.email || apiError?.field === "email") && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email?.message || apiError?.message}
                    </p>
                  )}
                </div>

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
                      {...register("phone")}
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.phone || apiError?.field === "phone"
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } rounded-lg focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder={t.signupPage.form.phonePlaceholder}
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
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } rounded-lg focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder={t.signupPage.form.passwordPlaceholder}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <div className="relative">
                    <Lock
                      className={`absolute top-3 ${
                        lang === "ar" ? "right-3" : "left-3"
                      } h-5 w-5 text-gray-400`}
                    />
                    <input
                      type="password"
                      {...register("confirmPassword")}
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } rounded-lg focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder={t.signupPage.form.confirmPasswordPlaceholder}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("agreeTerms")}
                      className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {t.signupPage.form.agreeTermsText}{" "}
                      <button
                        type="button"
                        onClick={termsModal.open}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {t.signupPage.form.termsButtonText}
                      </button>{" "}
                      {t.signupPage.form.andText}{" "}
                      <button
                        type="button"
                        onClick={termsModal.open}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {t.signupPage.form.privacyPolicyText}
                      </button>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.agreeTerms.message}
                    </p>
                  )}
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
                      {t.signupPage.form.registering}
                    </span>
                  ) : (
                    t.signupPage.form.submitButton
                  )}
                </button>

                {/* Sign In Link */}
                <p className="text-center text-gray-600">
                  {t.signupPage.sideImage.loginTextBeforeLink}{" "}
                  <Link
                    href="/employer/signin"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {t.signupPage.sideImage.loginLinkText}
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Side Image Section */}
          <div className="hidden lg:block flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-12">
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t.signupPage.sideImage.heading}
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                {t.signupPage.sideImage.description}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">
                    {t.signupPage.sideImage.features.feature1}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">
                    {t.signupPage.sideImage.features.feature2}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">
                    {t.signupPage.sideImage.features.feature3}
                  </span>
                </div>
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
