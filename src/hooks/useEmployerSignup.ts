import { useState } from "react";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { employerSignupSchema } from "@/schemas/employerSignupSchema";
import { api } from "@/lib/axios";

type FormData = yup.InferType<typeof employerSignupSchema>;

export const useEmployerSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm<FormData>({
    resolver: yupResolver(employerSignupSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/employer/signup", data);

      window.location.href = "/employer/dashboard";
      toast.success("تم الاشتراك بنجاح!");
      
    } catch (error: any) {
      let errorMessage = "تعذر الاتصال بالخادم";

      if (error.response) {
        // Handle HTTP errors
        if (
          error.response.status === 400 &&
          error.response.data.message?.includes("الهاتف")
        ) {
          errorMessage = "رقم الهاتف مستخدم بالفعل، الرجاء استخدام رقم آخر";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "لا يوجد اتصال بالخادم";
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
