"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";
import { useOptions } from "@/context/options/OptionsContext";
import { useFormSubmit } from "../hooks/useFormSubmit";
import FormCard from "./FormCard";
import BilingualInput from "./BilingualInput";
import BilingualTextarea from "./BilingualTextarea";
import BilingualSelect from "./BilingualSelect";
import ImageUpload from "./ImageUpload";
import BilingualCheckbox from "./BilingualCheckbox";
import LoadingOverlay from "./LoadingOverlay";
import ActionButtons from "./ActionButtons";

type JobTypeOption = {
  id: string;
  code: string;
  nameAr: string;
  nameHe: string;
};

export default function PostJobForm() {
  const t = useEmployerTranslations();
  const { lang } = useLanguage();
  const { cities, industries, loading: optionsLoading } = useOptions();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { handleSubmit, isLoading } = useFormSubmit();

  const jobTypeOptions: JobTypeOption[] = [
    { id: "1", code: "full-time", nameAr: "دوام كامل", nameHe: "משרה מלאה" },
    { id: "2", code: "part-time", nameAr: "دوام جزئي", nameHe: "משרה חלקית" },
    { id: "3", code: "contract", nameAr: "عقد", nameHe: "חוזה" },
    { id: "4", code: "freelance", nameAr: "عمل حر", nameHe: "פרילנס" },
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, {
      successMessage: {
        ar: "تم نشر الوظيفة بنجاح!",
        he: "המשרה פורסמה בהצלחה!",
      },
      errorMessage: {
        ar: "حدث خطأ في نشر الوظيفة",
        he: "אירעה שגיאה בפרסום המשרה",
      },
      redirectPath: "/employer/dashboard",
      lang,
    });
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information Card */}
        <FormCard title={t.postJobPage.basicInfo || "Basic Information"}>
          {/* Language Selection */}
          <BilingualSelect
            id="language"
            name="language"
            label={t.postJobPage.languageLabel}
            options={[
              { id: "he", value: "he", nameAr: "עברית", nameHe: "עברית" },
              { id: "ar", value: "ar", nameAr: "عربي", nameHe: "عربي" },
            ]}
            required
          />

          {/* Job Title */}
          <BilingualInput
            id="jobTitle"
            name="jobTitle"
            label={t.postJobPage.jobTitle}
            type="text"
            required
          />

          {/* Job Type */}
          <BilingualSelect
            id="jobType"
            name="jobType"
            label={t.postJobPage.jobType}
            options={jobTypeOptions}
            required
          />

          {/* Location */}
          <BilingualSelect
            id="city"
            name="city"
            label={t.postJobPage.location}
            options={cities}
            required
          />

          {/* Industry */}
          <BilingualSelect
            id="industry"
            name="industry"
            label={t.postJobPage.industry}
            options={industries}
            required
          />

          {/* Salary */}
          <BilingualInput
            id="salary"
            name="salary"
            label={t.postJobPage.salary}
            type="text"
            required
          />
        </FormCard>

        {/* Job Details Card */}
        <FormCard title={t.postJobPage.jobDetails || "Job Details"}>
          {/* Job Description */}
          <BilingualTextarea
            id="jobDescription"
            name="jobDescription"
            label={t.postJobPage.jobDescription}
            rows={5}
            required
          />

          {/* Required Qualifications */}
          <BilingualTextarea
            id="requiredQualifications"
            name="requiredQualifications"
            label={t.postJobPage.qualifications}
            rows={5}
            required
          />

          {/* Job Image */}
          <ImageUpload
            id="jobImage"
            name="jobImage"
            label={t.postJobPage.jobImage}
            helperText={t.postJobPage.jobImageHelper}
            onImageChange={setImagePreview}
            preview={imagePreview}
            required
          />

          {/* Additional Options */}
          <div className="space-y-3 pt-4">
            <BilingualCheckbox
              id="transportation"
              name="transportation"
              label={t.postJobPage.transportation}
            />

            <BilingualCheckbox
              id="hebrew"
              name="hebrew"
              label={t.postJobPage.hebrewRequired}
            />
          </div>
        </FormCard>
      </div>

      {/* Action Buttons */}
      <ActionButtons isSubmitting={isLoading} />

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}

      {/* Show loading state when options are loading */}
      {optionsLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <p className="text-lg">
            {lang === "ar" ? "جاري التحميل..." : "טוען אפשרויות..."}
          </p>
        </div>
      )}
    </motion.form>
  );
}
