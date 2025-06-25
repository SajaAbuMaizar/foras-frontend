import React, { useState } from "react";
import { AdminJobDetailsItem } from "@/types/AdminJobDetailsItem";

interface Props {
  job: AdminJobDetailsItem;
  showTranslationFields: boolean;
  handleTranslate: (e: React.FormEvent<HTMLFormElement>) => void;
  isTranslating: boolean;
}

interface FormErrors {
  translatedTitle?: string;
  translatedDescription?: string;
  translatedRequiredQualifications?: string;
}

const JobTranslatedDetails: React.FC<Props> = ({
  job,
  showTranslationFields,
  handleTranslate,
  isTranslating,
}) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.get("translatedTitle")?.toString().trim()) {
      newErrors.translatedTitle = "שדה חובה";
      isValid = false;
    }

    if (!formData.get("translatedDescription")?.toString().trim()) {
      newErrors.translatedDescription = "שדה חובה";
      isValid = false;
    }

    if (!formData.get("translatedRequiredQualifications")?.toString().trim()) {
      newErrors.translatedRequiredQualifications = "שדה חובה";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (validateForm(formData)) {
      handleTranslate(e);
    }
  };

  const handleInvalid = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
  };

  return (
    <div className="w-full md:w-1/2 pl-6">
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <div>
            <strong>العنوان:</strong>
            <h2 className="text-xl font-semibold">
              {job.titleTranslated || "لم يتم الترجمة بعد"}
            </h2>
            {showTranslationFields && (
              <div className="mt-1">
                <input
                  type="text"
                  name="translatedTitle"
                  maxLength={20}
                  defaultValue={job.titleTranslated || ""}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.translatedTitle
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  onInvalid={handleInvalid}
                  disabled={isTranslating}
                />
                {errors.translatedTitle && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.translatedTitle}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <strong>الوصف:</strong>
            <h3 className="text-gray-700">
              {job.descriptionTranslated || "لم يتم الترجمة بعد"}
            </h3>
            {showTranslationFields && (
              <div className="mt-1">
                <textarea
                  name="translatedDescription"
                  defaultValue={job.descriptionTranslated || ""}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.translatedDescription
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  rows={4}
                  onInvalid={handleInvalid}
                  disabled={isTranslating}
                />
                {errors.translatedDescription && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.translatedDescription}
                  </p>
                )}
              </div>
            )}
          </div>

          <ul className="text-base space-y-2">
            <li>
              <strong>المنطقة:</strong> {job.cityName.nameAr}
            </li>
            <li>
              <strong>نوع الوظيفة:</strong> {job.jobType}
            </li>
            <li>
              <strong>المجال:</strong> {job.cityName.nameAr}
            </li>
            <li>
              <strong>الراتب:</strong> {job.salary}
            </li>
            <li>
              <div className="mb-1">
                <strong>المؤهلات المطلوبة:</strong>{" "}
                {job.qualificationsTranslated || "لم يتم الترجمة بعد"}
              </div>
              {showTranslationFields && (
                <div className="mt-1">
                  <textarea
                    name="translatedRequiredQualifications"
                    defaultValue={job.qualificationsTranslated || ""}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.translatedRequiredQualifications
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    rows={4}
                    onInvalid={handleInvalid}
                    disabled={isTranslating}
                  />
                  {errors.translatedRequiredQualifications && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.translatedRequiredQualifications}
                    </p>
                  )}
                </div>
              )}
            </li>
            <li>
              <strong>تاريخ النشر:</strong> {job.publicationDate}
            </li>
            <li>
              <strong>وسيلة نقل:</strong>{" "}
              {job.transportationAvailable ? "نعم" : "لا"}
            </li>
          </ul>

          {showTranslationFields && (
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow hover:shadow-lg transition disabled:opacity-50"
              disabled={isTranslating}
            >
              {isTranslating ? "שומר..." : "احفظ الترجمة"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobTranslatedDetails;
