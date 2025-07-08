"use client";

import { useState, useEffect } from "react";
import { Briefcase, Building2, MapPin, DollarSign, Upload } from "lucide-react";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import ImageUpload from "./ImageUpload";
import { useOptions } from "@/context/options/OptionsContext";

interface SeedJobFormProps {
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

export default function SeedJobForm({
  onSubmit,
  isSubmitting,
}: SeedJobFormProps) {
  const [formData, setFormData] = useState({
    // Job details
    jobTitle: "",
    jobDescription: "",
    language: "he",
    cityId: "",
    jobType: "full-time",
    industryId: "",
    salary: "",
    requiredQualifications: "",
    transportation: false,
    hebrew: false,
    autoApprove: true,

    // Company details
    companyName: "",
    companyDescription: "",
    companyPhone: "",
    companyEmail: "",
    companyLogoFile: null as File | null,

    // Image
    jobImage: null as File | null,
  });
  const { cities, industries, loading } = useOptions();

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Job Information Section */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          פרטי המשרה
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="כותרת המשרה"
            value={formData.jobTitle}
            onChange={(value) => handleChange("jobTitle", value)}
            placeholder="למשל: מנהל/ת חנות"
            required
          />

          <FormSelect
            label="שפה"
            value={formData.language}
            onChange={(value) => handleChange("language", value)}
            options={[
              { value: "he", label: "עברית" },
              { value: "ar", label: "ערבית" },
            ]}
            required
          />

          <FormSelect
            label="עיר"
            value={formData.cityId}
            onChange={(value) => handleChange("cityId", value)}
            options={cities.map((city) => ({
              value: city.id.toString(),
              label: city.nameHe,
            }))}
            required
          />

          <FormSelect
            label="תחום"
            value={formData.industryId}
            onChange={(value) => handleChange("industryId", value)}
            options={industries.map((industry) => ({
              value: industry.id.toString(),
              label: industry.nameHe,
            }))}
            required
          />

          <FormSelect
            label="סוג משרה"
            value={formData.jobType}
            onChange={(value) => handleChange("jobType", value)}
            options={[
              { value: "full-time", label: "משרה מלאה" },
              { value: "part-time", label: "משרה חלקית" },
              { value: "temporary", label: "זמני" },
              { value: "contract", label: "קבלן" },
            ]}
            required
          />

          <FormInput
            label="שכר"
            value={formData.salary}
            onChange={(value) => handleChange("salary", value)}
            placeholder="למשל: 8,000-10,000 ₪"
            icon={<DollarSign className="w-4 h-4" />}
            required
          />
        </div>

        <div className="mt-4">
          <FormTextarea
            label="תיאור המשרה"
            value={formData.jobDescription}
            onChange={(value) => handleChange("jobDescription", value)}
            placeholder="תאר את המשרה, האחריות והמשימות..."
            rows={4}
            required
          />
        </div>

        <div className="mt-4">
          <FormTextarea
            label="דרישות התפקיד"
            value={formData.requiredQualifications}
            onChange={(value) => handleChange("requiredQualifications", value)}
            placeholder="פרט את הכישורים והניסיון הנדרשים..."
            rows={3}
            required
          />
        </div>

        <div className="mt-4 flex gap-4">
          <FormCheckbox
            label="הסעות זמינות"
            checked={formData.transportation}
            onChange={(checked) => handleChange("transportation", checked)}
          />

          <FormCheckbox
            label="דרושה עברית"
            checked={formData.hebrew}
            onChange={(checked) => handleChange("hebrew", checked)}
          />

          <FormCheckbox
            label="אישור אוטומטי"
            checked={formData.autoApprove}
            onChange={(checked) => handleChange("autoApprove", checked)}
          />
        </div>
      </div>

      {/* Company Information Section */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          פרטי החברה הפיקטיבית
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="שם החברה"
            value={formData.companyName}
            onChange={(value) => handleChange("companyName", value)}
            placeholder="למשל: סופר השכונה"
            required
          />

          <div className="mt-4">
            <ImageUpload
              onImageSelect={(file) => handleChange("companyLogoFile", file)}
              currentImage={formData.companyLogoFile}
              label="לוגו החברה"
              required
              variant="button"
            />
          </div>

          <FormInput
            label="טלפון"
            value={formData.companyPhone}
            onChange={(value) => handleChange("companyPhone", value)}
            placeholder="050-1234567"
            required
          />

          <FormInput
            label="אימייל"
            value={formData.companyEmail}
            onChange={(value) => handleChange("companyEmail", value)}
            placeholder="info@company.com"
            required
          />
        </div>

        <div className="mt-4">
          <FormTextarea
            label="תיאור החברה"
            value={formData.companyDescription}
            onChange={(value) => handleChange("companyDescription", value)}
            placeholder="תיאור קצר על החברה..."
            rows={2}
          />
        </div>
      </div>

      {/* Image Upload Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" />
          תמונת המשרה
        </h2>
        <ImageUpload
          onImageSelect={(file) => handleChange("jobImage", file)}
          currentImage={formData.jobImage}
          variant="card"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                   font-medium flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              יוצר משרה...
            </>
          ) : (
            "צור משרה"
          )}
        </button>
      </div>
    </form>
  );
}
