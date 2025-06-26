"use client";

import React from "react";
import { EmployerJobDetailsItem } from "@/types/EmployerJobDetailsItem";
import DetailItem from "./DetailItem";

interface JobDetailsProps {
  job: EmployerJobDetailsItem;
  lang: "ar" | "he" | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, lang }) => {
  const isArabic = lang === "ar" || lang === null;

  const t = (ar: string, he: string) => (isArabic ? ar : he);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(date)
      .replace(/,/g, "");
  };

  return (
    <div className="flex flex-col min-h-screen p-5 md:p-8 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-right">
        {t("تفاصيل الوظيفة", "פרטי משרה")}
      </h1>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Image */}
        <div className="w-full md:w-1/3">
          <img
            src={job.imageUrl}
            alt="Job"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-2/3">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {job.jobTitle}
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-300 leading-relaxed">
              {job.jobDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-gray-700 dark:text-gray-300">
            <DetailItem
              label={t("المدينة", "עיר")}
              value={isArabic ? job.cityName.nameAr : job.cityName.nameHe}
            />
            <DetailItem
              label={t("نوع الوظيفة", "סוג המשרה")}
              value={job.jobType}
            />
            <DetailItem
              label={t("المجال", "תחום")}
              value={
                isArabic ? job.industryName.nameAr : job.industryName.nameHe
              }
            />
            <DetailItem label={t("الراتب", "שכר")} value={job.salary} />
            <DetailItem
              label={t("المؤهلات المطلوبة", "כישורים נדרשים")}
              value={job.requiredQualifications}
            />
            <DetailItem
              label={t("تاريخ النشر", "תאריך פרסום")}
              value={formatDate(job.createdAt)}
            />
            <DetailItem
              label={t("مواصلات", "הסעה")}
              value={
                job.transportationAvailable ? t("نعم", "כן") : t("لا", "לא")
              }
            />
            <DetailItem
              label={t("عدد المتقدمين", "מספר המועמדים")}
              value={job.candidates.length.toString()}
            />
          </div>
        </div>
      </div>

      {/* Applicants */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-right">
          {t("قائمة المتقدمين", "רשימת המועמדים")}
        </h3>

        {job.candidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {job.candidates.map((c) => (
              <div
                key={c.id}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center"
              >
                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                  {c.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {c.phone}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            {t("لا يوجد متقدمين بعد", "אין מועמדים עדיין")}
          </p>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
