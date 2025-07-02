// src/hooks/useCandidateSignin.ts
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { loginCandidate } from "@/context/auth/authService";
import { useAuth } from "@/context/auth/AuthHooks";
import { useState } from "react";

const schema = yup.object({
  phone: yup.string().required("رقم الهاتف مطلوب"),
  password: yup.string().required("كلمة المرور مطلوبة"),
});

export interface SignInError {
  field?: "phone" | "password" | "general";
  message: string;
}

export const useCandidateSignin = (onSuccess?: () => void) => {
  const { refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<SignInError | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { phone: string; password: string }) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const res = await loginCandidate(data.phone, data.password);

      // Success
      toast.success("تم تسجيل الدخول بنجاح");
      await refreshUser();
      reset();
      onSuccess?.();
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "خطأ غير معروف";

      // Handle specific error types
      if (
        err?.response?.status === 404 ||
        errorMessage.includes("غير موجود") ||
        errorMessage.includes("البريد الإلكتروني")
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
        err?.response?.status === 401 ||
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
        err?.response?.status === 403 ||
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

      // Only show toast for general errors, not field-specific ones
      if (!["phone", "password"].includes(apiError?.field || "")) {
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
