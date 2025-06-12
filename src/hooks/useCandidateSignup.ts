import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth/AuthHooks";

const signupSchema = z.object({
  name: z.string().regex(/^[A-Za-z\s]+$/, "اسم صالح فقط (حروف انجليزية)"),
  phone: z.string().regex(/^[0-9]{10}$/, "رقم هاتف مكون من 10 أرقام"),
  city: z.string().min(1, "اختر المكان"),
  gender: z.string().min(1, "اختر الجنس"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string()
});

export type SignupFormData = z.infer<typeof signupSchema>;

export function useSignup(onClose: () => void) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });


  const { candidateSignin } = useAuth();


  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }

    try {
      const res = await fetch("/api/auth/candidate/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "حدث خطأ أثناء التسجيل");
      }

      toast.success(response.message || "تم إنشاء الحساب بنجاح!");

      // ✅ Automatically sign in after signup
      const loggedIn = await candidateSignin(data.phone, data.password);

      if (loggedIn) {
        reset();         // ✅ Clear form
        onClose();       // ✅ Close modal
      }

    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "تعذر الاتصال بالخادم"
      );
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
