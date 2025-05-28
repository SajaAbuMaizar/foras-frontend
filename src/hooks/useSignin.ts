// hooks/useSignin.ts
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/context/AuthContext';

const schema = yup.object({
  phone: yup.string().required('رقم الهاتف مطلوب'),
  password: yup.string().required('كلمة المرور مطلوبة'),
});

export const useSignin = (onClose: () => void) => {
  const { signin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const success = await signin(data.phone, data.password);
    if (success) onClose();
  };

  return { register, handleSubmit, onSubmit, errors };
};
