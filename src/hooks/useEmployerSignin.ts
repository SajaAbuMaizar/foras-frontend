"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { api } from "@/lib/axios";

const signinSchema = z.object({
  phone: z.string().min(10, "يجب أن يتكون رقم الهاتف من 10 أرقام على الأقل"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type SigninFormData = z.infer<typeof signinSchema>;

export const useSignin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      const response = await api.post("/api/auth/employer/signin", data);

      toast.success("تم تسجيل الدخول بنجاح!");
      window.location.href = "/employer/dashboard";
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          toast.error(
            error.response.data?.message || "بيانات الاعتماد غير صحيحة"
          );
        } else {
          toast.error(error.response.data?.message || "فشل تسجيل الدخول");
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("لا يوجد اتصال بالخادم");
      } else {
        // Something happened in setting up the request
        toast.error("حدث خطأ أثناء إعداد الطلب");
      }
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};
