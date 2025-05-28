// components/SigninModal.tsx
'use client';
import React from 'react';
import { useSignin } from '@/hooks/useSignin';
import { X } from 'lucide-react';

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SigninModal: React.FC<SigninModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, onSubmit, errors } = useSignin(onClose);

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md w-full max-w-md p-6 relative" dir="rtl">
        <button className="absolute top-4 left-4 text-black" onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">تسجيل الدخول</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('phone')} placeholder="رقم الهاتف" className="w-full border p-2 rounded" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

          <input type="password" {...register('password')} placeholder="كلمة المرور" className="w-full border p-2 rounded" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button type="submit" className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninModal;
