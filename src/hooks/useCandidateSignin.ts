import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { loginCandidate } from '@/context/auth/authService';
import { useAuth } from '@/context/auth/AuthHooks';

const schema = yup.object({
  phone: yup.string().required('رقم الهاتف مطلوب'),
  password: yup.string().required('كلمة المرور مطلوبة'),
});

export const useCandidateSignin = (onSuccess?: () => void) => {
  const { refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { phone: string; password: string }) => {
    try {
      const res = await loginCandidate(data.phone, data.password);
      if (res.status === 200) {
        toast.success('تم تسجيل الدخول بنجاح');
        await refreshUser(); // set user globally
        onSuccess?.();
      } else {
        const error = 'بيانات الاعتماد غير صحيحة';
        throw new Error(error);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'خطأ غير معروف');
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
