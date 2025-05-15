import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signinSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, "رقم الهاتف غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type SigninFormData = z.infer<typeof signinSchema>;

export function useSignin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      const res = await fetch("/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any),
      });

      if (res.ok) {
        toast.success("تم تسجيل الدخول بنجاح!");
        window.location.href = "/";
      } else if (res.status === 400) {
        toast.error("رقم الهاتف أو كلمة المرور غير صحيحة");
      } else {
        toast.error("حدث خطأ أثناء تسجيل الدخول");
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
  };
}
