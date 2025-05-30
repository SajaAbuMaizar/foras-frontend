'use client';

import { useSignin } from '@/hooks/useEmployerSignin';
import LabeledInput from "@/components/ui/LabeledInput";
import { MdPhone, MdLock } from "react-icons/md";

export default function SigninForm() {
    const { register, handleSubmit, onSubmit, errors } = useSignin();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <LabeledInput
                type="phone"
                placeholder="البريد الإلكتروني"
                {...register("phone")}
                icon={MdPhone}
                error={errors.phone}
            />

            <LabeledInput
                type="password"
                placeholder="كلمة المرور"
                {...register("password")}
                icon={MdLock}
                error={errors.password}
            />

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded"
            >
                تسجيل الدخول
            </button>
        </form>
    );
}