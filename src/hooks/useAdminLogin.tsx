// src/hooks/useAdminLogin.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth/AuthHooks";

const loginSchema = z.object({
  phone: z.string().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginError {
  field?: "phone" | "password" | "general";
  message: string;
}

export const useAdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<LoginError | null>(null);

  const router = useRouter();
  const { refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    setIsLoading(true);

    try {
      const response = await apiClient.withRetry(() =>
        apiClient.post("/api/auth/admin/login", data)
      );

      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/admin/dashboard");
      await refreshUser();
      reset();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "فشل تسجيل الدخول";

      // Handle specific error types based on the backend messages
      if (
        errorMessage.includes("Phone number not registered") ||
        errorMessage.includes("غير مسجل")
      ) {
        setApiError({
          field: "phone",
          message: "رقم الهاتف غير مسجل في النظام",
        });
        setError("phone", {
          type: "manual",
          message: "رقم الهاتف غير مسجل",
        });
      } else if (
        errorMessage.includes("Invalid password") ||
        errorMessage.includes("كلمة المرور")
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
        errorMessage.includes("Account is disabled") ||
        errorMessage.includes("معطل")
      ) {
        setApiError({
          field: "general",
          message: "الحساب معطل. يرجى التواصل مع الدعم الفني",
        });
      } else if (error?.response?.status === 403) {
        setApiError({
          field: "general",
          message: "ليس لديك صلاحية الوصول إلى لوحة التحكم",
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
    isLoading,
    apiError,
    reset,
  };
};
