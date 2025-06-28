"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api-client"; // Changed from axios

const signinSchema = z.object({
  phone: z.string().min(10, "يجب أن يتكون رقم الهاتف من 10 أرقام على الأقل"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type SigninFormData = z.infer<typeof signinSchema>;

export const useSignin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      await apiClient.withRetry(() =>
        apiClient.post("/api/auth/employer/signin", data)
      );

      toast.success("تم تسجيل الدخول بنجاح!");
      window.location.href = "/employer/dashboard";
    } catch (error: any) {
      // Error handling is now mostly handled by APIClient's interceptors
      // We only need to handle specific cases here if needed
      if (error.response?.status === 401) {
        // This might be redundant now since APIClient handles 401 globally
        toast.error(
          error.response.data?.message || "بيانات الاعتماد غير صحيحة"
        );
      }
      // All other errors are already handled by APIClient's interceptors
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting, // Added loading state
  };
};
