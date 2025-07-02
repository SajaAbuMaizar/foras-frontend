"use client";

import { useSignin } from "@/hooks/useEmployerSignin";
import LabeledInput from "@/components/ui/LabeledInput";
import { MdPhone, MdLock } from "react-icons/md";
import { useLanguage } from "@/context/language/LanguageContext";
import { translations } from "@/translations";

export default function SigninForm() {
  const { register, handleSubmit, onSubmit, errors } = useSignin();
  const { lang } = useLanguage();
  const t = translations[lang].signinPage;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <LabeledInput
        type="phone"
        placeholder={t.form.phonePlaceholder}
        {...register("phone")}
        icon={MdPhone}
        error={errors.phone}
      />

      <LabeledInput
        type="password"
        placeholder={t.form.passwordPlaceholder}
        {...register("password")}
        icon={MdLock}
        error={errors.password}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded"
      >
        {t.form.submitButton}
      </button>
    </form>
  );
}
