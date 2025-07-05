// src/hooks/useEmployerSignup.ts
import { useState } from "react";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { employerSignupSchema } from "@/schemas/employerSignupSchema";
import { apiClient } from "@/lib/api-client";

type FormData = yup.InferType<typeof employerSignupSchema>;

export interface SignUpError {
  field?: "phone" | "email" | "general";
  message: string;
}

export const useEmployerSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<SignUpError | null>(null);

  const formMethods = useForm<FormData>({
    resolver: yupResolver(employerSignupSchema),
  });

  const { setError, reset } = formMethods;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setApiError(null);

    // Prepare data for backend (remove confirmPassword and agreeTerms)
    const backendData = {
      name: data.name,
      companyName: data.companyName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    try {
      await apiClient.withRetry(
        () => apiClient.post("/api/auth/employer/signup", backendData),
        {
          retries: 2, // Fewer retries for signup to avoid duplicate submissions
          retryCondition: (error) => {
            // Only retry on network errors or server errors (not 400s)
            return !error.response || error.response.status >= 500;
          },
        }
      );

      toast.success("تم إنشاء الحساب بنجاح!");
      window.location.href = "/employer/dashboard";
      reset();
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
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    formMethods,
    onSubmit,
    apiError,
    reset,
  };
};
