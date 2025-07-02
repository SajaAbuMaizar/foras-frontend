// src/app/admin/login/components/LoginForm.tsx
"use client";

import { Eye, EyeOff, Lock, Phone, Shield } from "lucide-react";
import { useState } from "react";
import { useAdminLogin } from "@/hooks/useAdminLogin";

const AdminLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, onSubmit, errors, isLoading, apiError } =
    useAdminLogin();

  return (
    <div className="w-full lg:w-1/2 p-8 lg:p-12">
      {/* Logo/Icon */}
      <div className="flex justify-center mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-2xl shadow-lg">
          <Shield className="h-14 w-14 text-white" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
        لوحة تحكم المدير
      </h2>
      <p className="text-center text-gray-600 mb-8">
        مرحباً بك في نظام إدارة المنصة
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* API Error Display */}
        {apiError && apiError.field === "general" && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <div className="flex items-start">
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
              <span className="font-medium">{apiError.message}</span>
            </div>
          </div>
        )}

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              className={`w-full pr-10 pl-3 py-3.5 border-2 rounded-xl focus:outline-none transition-all text-lg ${
                errors.phone || apiError?.field === "phone"
                  ? "border-red-300 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-indigo-500 hover:border-gray-300"
              }`}
            />
          </div>
          {(errors.phone || apiError?.field === "phone") && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              className={`w-full pr-10 pl-10 py-3.5 border-2 rounded-xl focus:outline-none transition-all text-lg ${
                errors.password || apiError?.field === "password"
                  ? "border-red-300 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-indigo-500 hover:border-gray-300"
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
            <p className="text-red-500 text-sm mt-2 flex items-center">
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="mr-2 text-sm text-gray-700">تذكرني</span>
          </label>
          <a
            href="#"
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            نسيت كلمة المرور؟
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-medium text-white text-lg transition-all transform ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98]"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
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

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <Lock className="inline h-3 w-3 ml-1" />
            اتصال آمن ومشفر • جميع البيانات محمية
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
