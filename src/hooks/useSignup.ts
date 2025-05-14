// hooks/useSignup.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

const signupSchema = z.object({
  name: z.string().regex(/^[A-Za-z\s]+$/, "اسم صالح فقط (حروف انجليزية)"),
  phone: z.string().regex(/^[0-9]{10}$/, "رقم هاتف مكون من 10 أرقام"),
  city: z.string().min(1, "اختر المكان"),
  gender: z.string().min(1, "اختر الجنس"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string()
});

export type SignupFormData = z.infer<typeof signupSchema>;

export function useSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }

    try {
      const res = await fetch("/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any),
      });

      if (res.ok) {
        toast.success("تم إنشاء الحساب بنجاح!");
        window.location.href = "/";
      } else if (res.status === 400) {
        toast.error("رقم الهاتف مستخدم بالفعل");
      } else {
        toast.error("حدث خطأ أثناء التسجيل");
      }
    } catch {
      toast.error("تعذر الاتصال بالخادم");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    watch,
  };
}
