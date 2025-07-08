"use client";

import { JobApplicationWithCandidate } from "@/types/JobApplicationWithCandidate";
import { useLanguage } from "@/context/language/LanguageContext";
import { getSkillTranslation } from "@/utils/skillTranslations";
import { getLanguageTranslation } from "@/utils/languageTranslations";

interface PrintableViewProps {
  applications: JobApplicationWithCandidate[];
  jobTitle: string;
}

export default function PrintableView({
  applications,
  jobTitle,
}: PrintableViewProps) {
  const { lang } = useLanguage();

  return (
    <div className="hidden print:block">
      <style jsx>{`
        @media print {
          @page {
            size: A4;
            margin: 20mm;
          }
        }
      `}</style>

      <div className="print:text-black">
        <h1 className="text-2xl font-bold mb-2">{jobTitle}</h1>
        <p className="text-sm mb-6">
          {lang === "ar" ? "قائمة المتقدمين" : "רשימת מועמדים"} -{" "}
          {new Date().toLocaleDateString(lang === "ar" ? "ar-SA" : "he-IL")}
        </p>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="text-right p-2">
                {lang === "ar" ? "الاسم" : "שם"}
              </th>
              <th className="text-right p-2">
                {lang === "ar" ? "الهاتف" : "טלפון"}
              </th>
              <th className="text-right p-2">
                {lang === "ar" ? "المنطقة" : "אזור"}
              </th>
              <th className="text-right p-2">
                {lang === "ar" ? "المهارات" : "כישורים"}
              </th>
              <th className="text-right p-2">
                {lang === "ar" ? "اللغات" : "שפות"}
              </th>
              <th className="text-right p-2">
                {lang === "ar" ? "الحالة" : "סטטוס"}
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr
                key={app.id}
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="p-2">{app.candidate.name}</td>
                <td className="p-2">{app.candidate.phone}</td>
                <td className="p-2">{app.candidate.area}</td>
                <td className="p-2 text-sm">
                  {app.candidate.skills
                    .map((skill) => getSkillTranslation(skill, lang))
                    .join(", ") || "-"}
                </td>
                <td className="p-2 text-sm">
                  {app.candidate.languages
                    .map((language) => getLanguageTranslation(language, lang))
                    .join(", ") || "-"}
                </td>
                <td className="p-2">
                  {lang === "ar"
                    ? app.status === "ACCEPTED"
                      ? "مقبول"
                      : app.status === "REJECTED"
                      ? "مرفوض"
                      : "قيد الانتظار"
                    : app.status === "ACCEPTED"
                    ? "התקבל"
                    : app.status === "REJECTED"
                    ? "נדחה"
                    : "ממתין"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
