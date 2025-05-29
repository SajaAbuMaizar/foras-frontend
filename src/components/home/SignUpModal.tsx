// components/SignupModal.tsx
'use client';
import React from 'react';
import { useSignup } from '@/hooks/useSignup';
import { X } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, onSubmit, errors, cities, genders } = useSignup(onClose);

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md w-full max-w-md p-6 relative" dir="rtl">
        <button className="absolute top-4 left-4 text-black" onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">اشتراك حساب جديد</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('name')} placeholder="الاسم باللغة الانجليزية" className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input {...register('phone')} placeholder="رقم الهاتف" className="w-full border p-2 rounded" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

          <select {...register('city')} className="w-full border p-2 rounded">
            <option value="">اختر المكان</option>
            {cities.map(city => (
              <option key={city.code} value={city.code}>{city.nameAr}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

          <select {...register('gender')} className="w-full border p-2 rounded">
            <option value="">اختر الجنس</option>
            {genders.map(gender => (
              <option key={gender.value} value={gender.value}>{gender.labelAr}</option>
            ))}
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}

          <input type="password" {...register('password')} placeholder="كلمة المرور" className="w-full border p-2 rounded" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <input type="password" {...register('confirmPassword')} placeholder="تأكيد كلمة المرور" className="w-full border p-2 rounded" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            سجل الآن
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
