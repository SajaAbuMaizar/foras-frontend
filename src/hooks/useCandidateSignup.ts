// src/hooks/useCandidateSignup.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth/AuthHooks";
import { useState } from "react";

const signupSchema = z.object({
  name: z.string().regex(/^[A-Za-z\s]+$/, "اسم صالح فقط (حروف انجليزية)"),
  phone: z.string().regex(/^[0-9]{10}$/, "رقم هاتف مكون من 10 أرقام"),
  city: z.string().min(1, "اختر المكان"),
  gender: z.string().min(1, "اختر الجنس"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string(),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export interface SignUpError {
  field?: "phone" | "email" | "general";
  message: string;
}

export function useSignup(onClose: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<SignUpError | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { refreshUser } = useAuth();

  const onSubmit = async (data: SignupFormData) => {
    setApiError(null);

    // Validate password match
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "كلمة المرور غير متطابقة",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/candidate/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        // Handle specific error types
        if (
          res.status === 409 ||
          response.message?.includes("مسجل") ||
          response.message?.includes("موجود")
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
          response.message?.includes("البريد") ||
          response.message?.includes("email")
        ) {
          setApiError({
            field: "email",
            message: "البريد الإلكتروني مسجل بالفعل",
          });
        } else {
          setApiError({
            field: "general",
            message: response.message || "حدث خطأ أثناء التسجيل",
          });
        }
        return;
      }

      // Success
      toast.success(response.message || "تم إنشاء الحساب بنجاح!");
      await refreshUser();
      reset();
      onClose();
    } catch (error) {
      setApiError({
        field: "general",
        message: "تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى",
      });
      toast.error("تعذر الاتصال بالخادم");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    watch,
    isLoading,
    apiError,
    reset,
  };
}
