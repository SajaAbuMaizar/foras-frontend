'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const signinSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
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
      const res = await fetch("/employer/signin", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any),
      });

      if (res.ok) {
        toast.success("تم تسجيل الدخول بنجاح!");
        window.location.href = "/";
      } else {
        toast.error("فشل تسجيل الدخول");
      }
    } catch {
      toast.error("خطأ في الاتصال بالخادم");
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};
