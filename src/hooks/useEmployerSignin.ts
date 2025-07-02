// src/hooks/useEmployerSignin.ts
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api-client";

const signinSchema = z.object({
  phone: z.string().min(10, "يجب أن يتكون رقم الهاتف من 10 أرقام على الأقل"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type SigninFormData = z.infer<typeof signinSchema>;

export interface SignInError {
  field?: "phone" | "password" | "general";
  message: string;
}

export const useSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<SignInError | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await apiClient.withRetry(() =>
        apiClient.post("/api/auth/employer/signin", data)
      );

      toast.success("تم تسجيل الدخول بنجاح!");
      reset();
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
      } else if (
        error?.response?.status === 403 ||
        errorMessage.includes("محظور") ||
        errorMessage.includes("معطل")
      ) {
        setApiError({
          field: "general",
          message: "الحساب معطل أو محظور. يرجى التواصل مع الدعم",
        });
      } else {
        setApiError({
          field: "general",
          message: errorMessage,
        });
      }

      // Only show toast for general errors
      if (apiError?.field === "general") {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: isLoading,
    isLoading,
    apiError,
    reset,
  };
};
