import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  EmployerProfile,
  UpdateEmployerProfileRequest,
} from "@/types/employer/profile";
import { employerProfileService } from "@/services/employer/profileService";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";
import { InputField } from "./InputField";
import { LanguageSelector } from "./LanguageSelector";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^05\d{8}$/, "Phone must be a valid Israeli mobile number"),
  preferredLanguage: z.enum(["ar", "he"]),
});

interface ProfileFormProps {
  profile: EmployerProfile;
  onUpdate: (profile: EmployerProfile) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onUpdate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useEmployerTranslations();
  const { lang, setLang } = useLanguage();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UpdateEmployerProfileRequest>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      companyName: profile.companyName,
      email: profile.email,
      phone: profile.phone,
      preferredLanguage: profile.preferredLanguage, //fixme make the preferredlanguage optional and add dit password
    },
  });

  const selectedLanguage = watch("preferredLanguage");

  const onSubmit = async (data: UpdateEmployerProfileRequest) => {
    console.log("Submitting profile update:", data);
    setIsSubmitting(true);
    try {
      const updatedProfile = await employerProfileService.updateProfile(data);

      // Update global language if changed
      if (data.preferredLanguage !== profile.preferredLanguage) {
        setLang(data.preferredLanguage);
      }

      onUpdate(updatedProfile);
      toast.success(t.profile.success.updated);
    } catch (error) {
      toast.error(t.profile.errors.updateFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {t.profile.sections.basicInfo}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label={t.profile.fields.name}
            name="name"
            register={register}
            error={errors.name}
            required
          />

          <InputField
            label={t.profile.fields.companyName}
            name="companyName"
            register={register}
            error={errors.companyName}
            required
          />

          <InputField
            label={t.profile.fields.email}
            name="email"
            type="email"
            register={register}
            error={errors.email}
            required
          />

          <InputField
            label={t.profile.fields.phone}
            name="phone"
            register={register}
            error={errors.phone}
            required
            dir="ltr"
          />
        </div>

        <LanguageSelector
          value={selectedLanguage}
          onChange={(value) =>
            setValue("preferredLanguage", value as "ar" | "he")
          }
        />

        <div className="flex justify-end pt-6 border-t">
          <button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium
              ${
                isDirty && !isSubmitting
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
              transition-colors duration-200
            `}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{isSubmitting ? t.common.saving : t.common.save}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
