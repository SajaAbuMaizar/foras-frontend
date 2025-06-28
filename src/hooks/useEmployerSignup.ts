import { useState } from "react";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { employerSignupSchema } from "@/schemas/employerSignupSchema";
import { apiClient } from "@/lib/api-client";

type FormData = yup.InferType<typeof employerSignupSchema>;

export const useEmployerSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm<FormData>({
    resolver: yupResolver(employerSignupSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await apiClient.withRetry(
        () => apiClient.post("/api/auth/employer/signup", data),
        {
          retries: 2, // Fewer retries for signup to avoid duplicate submissions
          retryCondition: (error) => {
            // Only retry on network errors or server errors (not 400s)
            return !error.response || error.response.status >= 500;
          },
        }
      );

      window.location.href = "/employer/dashboard";
      toast.success("تم الاشتراك بنجاح!");
    } catch (error: any) {
      let errorMessage = "تعذر الاتصال بالخادم";

      // The error is already handled by apiClient's interceptor, but we add specific cases
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.message?.includes("الهاتف")
        ) {
          errorMessage = "رقم الهاتف مستخدم بالفعل، الرجاء استخدام رقم آخر";
        }
        // Other cases are already handled by apiClient's error interceptor
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    formMethods,
    onSubmit,
  };
};
