"use client";

import { useTermsModal } from "@/hooks/useTermsModal";
import TermsModal from "@/components/modals/TermsModal";
import LabeledInput from "@/components/ui/LabeledInput";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdBusiness,
  MdPhone,
  MdLockOutline,
} from "react-icons/md";
import { useEmployerSignup } from "@/hooks/useEmployerSignup";
import { useLanguage } from "@/context/language/LanguageContext";
import ar from "@/translations/ar";
import he from "@/translations/he";

const EmployerSignupForm = () => {
  const { lang } = useLanguage();
  const t = lang === "ar" ? ar.signupPage.form : he.signupPage.form;

  const termsModal = useTermsModal();
  const { isLoading, formMethods, onSubmit } = useEmployerSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full text-right"
    >
      <LabeledInput
        type="text"
        placeholder={t.namePlaceholder}
        {...register("name")}
        icon={MdPerson}
        error={errors.name}
      />

      <LabeledInput
        type="text"
        placeholder={t.companyNamePlaceholder}
        {...register("companyName")}
        icon={MdBusiness}
        error={errors.companyName}
      />

      <LabeledInput
        type="email"
        placeholder={t.emailPlaceholder}
        {...register("email")}
        icon={MdEmail}
        error={errors.email}
      />

      <LabeledInput
        placeholder={t.phonePlaceholder}
        {...register("phone")}
        icon={MdPhone}
        error={errors.phone}
      />

      <LabeledInput
        type="password"
        placeholder={t.passwordPlaceholder}
        {...register("password")}
        icon={MdLock}
        error={errors.password}
      />

      <LabeledInput
        type="password"
        placeholder={t.confirmPasswordPlaceholder}
        {...register("confirmPassword")}
        icon={MdLockOutline}
        error={errors.confirmPassword}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          {...register("agreeTerms")}
          className="accent-blue-600"
        />
        <span>
          {t.agreeTermsText}
          <button
            type="button"
            className="underline text-blue-600"
            onClick={termsModal.open}
          >
            {t.termsButtonText}
          </button>
        </span>
      </label>
      {errors.agreeTerms && (
        <p className="text-red-600 text-sm">{t.termsError}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded font-medium text-white transition-colors duration-200 ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? t.registering : t.submitButton}
      </button>

      <TermsModal isOpen={termsModal.isOpen} onClose={termsModal.close} />
    </form>
  );
};

export default EmployerSignupForm;
