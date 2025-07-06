// src/components/modals/CandidateSignUpModal.tsx
"use client";
import React, { useState } from "react";
import { useSignup } from "@/hooks/useCandidateSignup";
import { useOptions } from "@/context/options/OptionsContext";
import { X, User, Phone, MapPin, Users, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { cities, genders } = useOptions();

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    apiError,
    reset,
  } = useSignup(() => {
    onClose();
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all my-8"
        dir="rtl"
      >
        {/* Header */}
        <div className="relative p-6 border-b">
          <button
            className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            إنشاء حساب جديد
          </h2>
          <p className="text-center text-gray-500 mt-1 text-sm">
            انضم إلينا اليوم
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* API Error Display */}
          {apiError && apiError.field === "general" && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
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
                placeholder="John Doe"
                className={`w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
                placeholder="05XXXXXXXX"
                className={`w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* City Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المدينة
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                {...register("city")}
                className={`w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors appearance-none ${
                  errors.city
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
              >
                <option value="">اختر المدينة</option>
                {cities.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.nameAr}
                  </option>
                ))}
              </select>
            </div>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Gender Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الجنس
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                {...register("gender")}
                className={`w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors appearance-none ${
                  errors.gender
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
              >
                <option value="">اختر الجنس</option>
                {genders.map((gender) => (
                  <option key={gender.id} value={gender.code}>
                    {gender.nameAr}
                  </option>
                ))}
              </select>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
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
                placeholder="••••••••"
                className={`w-full pr-10 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
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
                placeholder="••••••••"
                className={`w-full pr-10 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.confirmPassword
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium text-white transition-all transform ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-[0.98]"
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
                جاري إنشاء الحساب...
              </span>
            ) : (
              "إنشاء حساب"
            )}
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            لديك حساب بالفعل؟{" "}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              onClick={() => {
                // You can emit an event or call a function to open signin modal
                toast("يرجى استخدام نموذج تسجيل الدخول");
              }}
            >
              تسجيل الدخول
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
