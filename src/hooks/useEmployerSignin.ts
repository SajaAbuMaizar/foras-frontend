"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api-client";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

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
  const t = useEmployerTranslations();
  const clearError = (field?: "phone" | "password" | "general") => {
    if (!field || apiError?.field === field) {
      setApiError(null);
    }
  };

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

      toast.success(t.auth.welcomeBack || "تم تسجيل الدخول بنجاح!");
      reset();
      window.location.href = "/employer/dashboard";
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "خطأ غير معروف";
      const statusCode = error?.response?.status;

      // Handle specific error types based on status codes
      if (statusCode === 404) {
        setApiError({
          field: "phone",
          message: t.signinPage.errors.phoneNotFound,
        });
      } else if (statusCode === 401) {
        const backendMessage = error?.response?.data?.message;
        const isPasswordError = backendMessage?.includes("كلمة المرور");

        setApiError({
          field: isPasswordError ? "password" : "general",
          message:
            backendMessage ||
            t.signinPage.errors.invalidCredentials ||
            "بيانات الاعتماد غير صحيحة",
        });

        if (isPasswordError) {
          setError("password", {
            type: "manual",
            message: backendMessage,
          });
        }
      } else if (statusCode === 403) {
        setApiError({
          field: "general",
          message:
            t.signinPage.errors.accountDisabled ||
            "الحساب معطل أو محظور. يرجى التواصل مع الدعم",
        });
        toast.error(apiError?.message || "الحساب معطل");
      } else if (statusCode === 429) {
        setApiError({
          field: "general",
          message:
            t.signinPage.errors.tooManyAttempts ||
            "تم تجاوز عدد المحاولات المسموح. يرجى المحاولة لاحقاً",
        });
        toast.error(apiError?.message || "تم تجاوز عدد المحاولات");
      } else if (statusCode >= 500) {
        setApiError({
          field: "general",
          message:
            t.signinPage.errors.serverError ||
            "حدث خطأ في الخادم. يرجى المحاولة لاحقاً",
        });
        toast.error(apiError?.message || "خطأ في الخادم");
      } else if (!error.response) {
        setApiError({
          field: "general",
          message:
            t.signinPage.errors.networkError ||
            "خطأ في الاتصال. تحقق من اتصالك بالإنترنت",
        });
        toast.error(apiError?.message || "خطأ في الاتصال");
      } else {
        // Generic error
        setApiError({
          field: "general",
          message: errorMessage,
        });
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
    clearError,
  };
};
