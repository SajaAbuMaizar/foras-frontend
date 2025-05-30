'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

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
      const res = await fetch("/api/auth/employer/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("تم تسجيل الدخول بنجاح!");
        window.location.href = "/employer/dashboard"; // Redirect to dashboard
      } else if (res.status === 401) {
        const response = await res.json();
        toast.error(response.message || "بيانات الاعتماد غير صحيحة");  
      } else {
        toast.error("فشل تسجيل الدخول");
      }
    } catch {
      toast.error("خطأ في الاتصال بالخادم");
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};
