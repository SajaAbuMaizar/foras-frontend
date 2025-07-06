import { useState } from "react";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { employerSignupSchema } from "@/schemas/employerSignupSchema";
import { apiClient } from "@/lib/api-client";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import axios from "axios";

type FormData = yup.InferType<typeof employerSignupSchema>;

export interface SignUpError {
  field?: "phone" | "email" | "general";
  message: string;
}

export const useEmployerSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<SignUpError | null>(null);
  const t = useEmployerTranslations();

  const formMethods = useForm<FormData>({
    resolver: yupResolver(employerSignupSchema),
  });

  const { setError, reset } = formMethods;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setApiError(null);

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
          retries: 2,
          retryCondition: (error) => {
            if (axios.isAxiosError(error)) {
              return !error.response || error.response.status >= 500;
            }
            return false;
          },
        }
      );

      toast.success(t.auth.welcome || "تم إنشاء الحساب بنجاح!", {
        style: {
          background: "#ecfdf5",
          color: "#065f46",
          border: "1px solid #a7f3d0",
        },
      });
      window.location.href = "/employer/dashboard";
      reset();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message;
      const statusCode = error?.response?.status;
      console.error("Signup error:", errorMessage, "Status code:", statusCode);

      if (statusCode === 409) {
        if (
          errorMessage.toLowerCase().includes("phone") ||
          errorMessage.includes("الهاتف")
        ) {
          const message = t.signupPage.errors.phoneExists;
          console.log("Phone error:", errorMessage);
          console.log("Phone error:", message);

          setApiError({ field: "phone", message });
          setError("phone", { type: "manual", message });
        } else if (
          errorMessage.toLowerCase().includes("email") ||
          errorMessage.includes("البريد")
        ) {
          const message =
            t.signupPage.errors.emailExists || "البريد الإلكتروني مسجل بالفعل";
          setApiError({ field: "email", message });
          setError("email", { type: "manual", message });
        } else {
          setApiError({ field: "general", message: errorMessage });
          toast.error(errorMessage, {
            style: {
              background: "#fee2e2",
              color: "#b91c1c",
              border: "1px solid #fca5a5",
            },
          });
        }
      } else if (statusCode === 400) {
        setApiError({
          field: "general",
          message: t.signupPage.errors.validationError,
        });
      } else if (statusCode === 429) {
        const message =
          t.signupPage.errors.tooManyAttempts || "تم تجاوز عدد المحاولات";
        setApiError({ field: "general", message });
        toast.error(message, {
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
            border: "1px solid #fca5a5",
          },
        });
      } else if (statusCode >= 500) {
        const message = t.signupPage.errors.serverError || "خطأ في الخادم";
        setApiError({ field: "general", message });
        toast.error(message, {
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
            border: "1px solid #fca5a5",
          },
        });
      } else if (!error.response) {
        const message = t.signupPage.errors.networkError || "خطأ في الاتصال";
        setApiError({ field: "general", message });
        toast.error(message, {
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
            border: "1px solid #fca5a5",
          },
        });
      } else {
        setApiError({ field: "general", message: errorMessage });
        toast.error(errorMessage, {
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
            border: "1px solid #fca5a5",
          },
        });
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
