import React, { useState } from "react";
import { AdminJobDetailsItem } from "@/types/AdminJobDetailsItem";

interface FormErrors {
    translatedTitle?: string;
    translatedDescription?: string;
    translatedRequiredQualifications?: string;
  }
  
  interface JobTranslatedDetailsProps {
    job: AdminJobDetailsItem;
    showTranslationFields: boolean;
    handleTranslate: (e: React.FormEvent<HTMLFormElement>) => void;
    isTranslating: boolean;
  }  

const JobTranslatedDetails: React.FC<JobTranslatedDetailsProps> = ({
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
  
    const handleInvalid = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();
    };
  
    return (
      <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {job.titleTranslated || "لم يتم الترجمة بعد"}
              </h2>
              {showTranslationFields && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                  <input
                    type="text"
                    name="translatedTitle"
                    maxLength={20}
                    defaultValue={job.titleTranslated || ""}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.translatedTitle
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2`}
                    onInvalid={handleInvalid}
                    disabled={isTranslating}
                    required
                  />
                  {errors.translatedTitle && (
                    <p className="mt-1 text-sm text-red-600">{errors.translatedTitle}</p>
                  )}
                </div>
              )}
            </div>
  
            <div>
              <h3 className="text-lg text-gray-600 leading-relaxed">
                {job.descriptionTranslated || "لم يتم الترجمة بعد"}
              </h3>
              {showTranslationFields && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                  <textarea
                    name="translatedDescription"
                    defaultValue={job.descriptionTranslated || ""}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.translatedDescription
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2`}
                    rows={4}
                    onInvalid={handleInvalid}
                    disabled={isTranslating}
                    required
                  />
                  {errors.translatedDescription && (
                    <p className="mt-1 text-sm text-red-600">{errors.translatedDescription}</p>
                  )}
                </div>
              )}
            </div>
  
            <ul className="space-y-3 text-gray-700">
              <li className="flex">
                <strong className="w-40 text-gray-600">المنطقة:</strong>
                <span>{job.cityName.nameAr}</span>
              </li>
              <li className="flex">
                <strong className="w-40 text-gray-600">نوع الوظيفة:</strong>
                <span>{job.jobType}</span>
              </li>
              <li className="flex">
                <strong className="w-40 text-gray-600">المجال:</strong>
                <span>{job.industryName.nameAr}</span>
              </li>
              <li className="flex">
                <strong className="w-40 text-gray-600">الراتب:</strong>
                <span>{job.salary}</span>
              </li>
              <li className="flex flex-col">
                <strong className="w-40 text-gray-600 mb-1">المؤهلات المطلوبة:</strong>
                <span className="whitespace-pre-line">
                  {job.qualificationsTranslated || "لم يتم الترجمة بعد"}
                </span>
                {showTranslationFields && (
                  <div className="mt-2">
                    <textarea
                      name="translatedRequiredQualifications"
                      defaultValue={job.qualificationsTranslated || ""}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.translatedRequiredQualifications
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2`}
                      rows={4}
                      onInvalid={handleInvalid}
                      disabled={isTranslating}
                      required
                    />
                    {errors.translatedRequiredQualifications && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.translatedRequiredQualifications}
                      </p>
                    )}
                  </div>
                )}
              </li>
              <li className="flex">
                <strong className="w-40 text-gray-600">تاريخ النشر:</strong>
                <span>{new Date(job.createdAt).toLocaleDateString('ar-EG')}</span>
              </li>
              <li className="flex">
                <strong className="w-40 text-gray-600">وسيلة نقل:</strong>
                <span>{job.transportationAvailable ? "نعم" : "لا"}</span>
              </li>
            </ul>
  
            {showTranslationFields && (
              <button
                type="submit"
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200 disabled:opacity-50"
                disabled={isTranslating}
              >
                {isTranslating ? "جاري الحفظ..." : "حفظ الترجمة"}
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };

export default JobTranslatedDetails;
