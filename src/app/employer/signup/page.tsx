"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEmployerSignup } from "@/hooks/useEmployerSignup";
import {
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import TermsModal from "@/components/modals/TermsModal";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const EmployerSignupPage = () => {
  const router = useRouter();
  const t = useEmployerTranslations();
  const { lang } = useLanguage();
  const termsModal = useDisclosure();
  const { onSubmit, isLoading } = useEmployerSignup();
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = t.signupPage.errors.nameRequired;
    }

    if (!formData.companyName) {
      newErrors.companyName = t.signupPage.errors.companyNameRequired;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.signupPage.errors.emailInvalid;
    }

    if (!formData.phone) {
      newErrors.phone = t.signupPage.errors.phoneRequired;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = t.signupPage.errors.phoneInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.signupPage.errors.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.signupPage.errors.passwordTooShort;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.signupPage.errors.passwordMismatch;
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t.signupPage.form.termsError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        name: formData.name,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: "",
        agreeTerms: false,
      });

      toast.success(t.auth.welcome);
      router.push("/employer/signin");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      if (errorMessage.includes("email")) {
        setErrors({ email: t.signupPage.errors.emailExists });
      } else if (errorMessage.includes("phone")) {
        setErrors({ phone: t.signupPage.errors.phoneExists });
      } else {
        toast.error(t.common.error);
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

      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="flex-1 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t.signupPage.title}
              </h1>
              <p className="text-gray-600 mb-8">{t.signupPage.subtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder={t.signupPage.form.namePlaceholder}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
                      required
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.companyName
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder={t.signupPage.form.companyNamePlaceholder}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.companyName}
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
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder={t.signupPage.form.emailPlaceholder}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder={t.signupPage.form.phonePlaceholder}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
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
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder={t.signupPage.form.passwordPlaceholder}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
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
                      required
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`w-full ${
                        lang === "ar" ? "pr-10 pl-3" : "pl-10 pr-3"
                      } py-3 border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder={t.signupPage.form.confirmPasswordPlaceholder}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agreeTerms: e.target.checked,
                        })
                      }
                      className={`${
                        lang === "ar" ? "ml-2" : "mr-2"
                      } mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded`}
                    />
                    <span className="text-sm text-gray-700">
                      {t.signupPage.form.agreeTermsText}{" "}
                      <button
                        type="button"
                        onClick={termsModal.open}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {t.signupPage.form.termsButtonText}
                      </button>{" "}
                      {t.signupPage.form.andText}{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {t.signupPage.form.privacyPolicyText}
                      </Link>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.agreeTerms}
                    </p>
                  )}
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
                      {t.signupPage.form.registering}
                    </span>
                  ) : (
                    t.signupPage.form.submitButton
                  )}
                </button>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-600">
                  {t.signupPage.sideImage.loginTextBeforeLink}{" "}
                  <Link
                    href="/employer/signin"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {t.signupPage.sideImage.loginLinkText}
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 items-center justify-center relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 text-white">
              <h3 className="text-3xl font-bold mb-4 text-center">
                {t.signupPage.sideImage.heading}
              </h3>
              <p className="text-lg mb-8 opacity-90 text-center">
                {t.signupPage.sideImage.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle
                    className={`h-6 w-6 ${
                      lang === "ar" ? "ml-3" : "mr-3"
                    } flex-shrink-0`}
                  />
                  <span
                    className={`${lang === "ar" ? "text-right" : "text-left"}`}
                  >
                    {t.signupPage.sideImage.features.feature1}
                  </span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle
                    className={`h-6 w-6 ${
                      lang === "ar" ? "ml-3" : "mr-3"
                    } flex-shrink-0`}
                  />
                  <span
                    className={`${lang === "ar" ? "text-right" : "text-left"}`}
                  >
                    {t.signupPage.sideImage.features.feature2}
                  </span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle
                    className={`h-6 w-6 ${
                      lang === "ar" ? "ml-3" : "mr-3"
                    } flex-shrink-0`}
                  />
                  <span
                    className={`${lang === "ar" ? "text-right" : "text-left"}`}
                  >
                    {t.signupPage.sideImage.features.feature3}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/employer/signin"
                  className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft
                    className={`${lang === "ar" ? "ml-2" : "mr-2"} h-5 w-5`}
                  />
                  {t.signupPage.sideImage.backToLogin}
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
