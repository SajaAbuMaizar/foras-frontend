// components/auth/EmployerSignupForm.tsx
"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTermsModal } from "@/hooks/useTermsModal";
import TermsModal from "@/components/modals/TermsModal";
import { employerSignupSchema } from "@/schemas/employerSignupSchema";
import LabeledInput from "@/components/ui/LabeledInput";
import { MdEmail, MdLock, MdPerson, MdBusiness, MdPhone, MdLockOutline } from "react-icons/md";



type FormData = yup.InferType<typeof employerSignupSchema>;

const EmployerSignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const termsModal = useTermsModal();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(employerSignupSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            // בדיקה במקום קריאת API
            await new Promise((res) => setTimeout(res, 1000));
            toast.success("تم الاشتراك بنجاح!");
        } catch (error) {
            toast.error("فشل الاشتراك");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full text-right">

            <LabeledInput
                type="text"
                placeholder="الاسم الكامل"
                {...register("name")}
                icon={MdPerson}
                error={errors.name}
            />

            <LabeledInput
                type="text"
                placeholder="اسم الشركة"
                {...register("companyName")}
                icon={MdBusiness}
                error={errors.companyName}
            />

            <LabeledInput
                type="email"
                placeholder="البريد الإلكتروني"
                {...register("email")}
                icon={MdEmail}
                error={errors.email}
            />

            <LabeledInput
                placeholder="رقم الهاتف"
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

            <LabeledInput
                type="password"
                placeholder="تأكيد كلمة المرور"
                {...register("confirmPassword")}
                icon={MdLockOutline}
                error={errors.confirmPassword}
            />
            <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register("agreeTerms")} className="accent-blue-600" />
                <span>
                    أوافق على{" "}
                    <button type="button" className="underline text-blue-600" onClick={termsModal.open}>
                        الشروط والأحكام
                    </button>
                </span>
            </label>
            {errors.agreeTerms && <p className="text-red-600 text-sm">{errors.agreeTerms.message}</p>}

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded font-medium text-white transition-colors duration-200 ${isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {isLoading ? "جارٍ التسجيل..." : "تسجيل"}
            </button>


            <TermsModal isOpen={termsModal.isOpen} onClose={termsModal.close} />
        </form>
    );
};

export default EmployerSignupForm;
