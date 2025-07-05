"use client";

import { EmployerJobDetailsItem } from "@/types/EmployerJobDetailsItem";
import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Car,
  Languages,
  Building,
  FileText,
} from "lucide-react";

interface JobInfoSectionProps {
  job: EmployerJobDetailsItem;
}

export default function JobInfoSection({ job }: JobInfoSectionProps) {
  const { lang } = useLanguage();
  const t = useEmployerTranslations();
  const isAr = lang === "ar";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("he-IL", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  };

  const InfoItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-gray-900 dark:text-white font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Job Title and Description */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {job.jobTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {job.jobDescription}
        </p>
      </div>

      {/* Job Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem
          icon={MapPin}
          label={t.jobDetails.location}
          value={isAr ? job.cityName.nameAr : job.cityName.nameHe}
        />
        <InfoItem
          icon={Building}
          label={t.jobDetails.industry}
          value={isAr ? job.industryName.nameAr : job.industryName.nameHe}
        />
        <InfoItem
          icon={Briefcase}
          label={t.jobDetails.jobType}
          value={job.jobType}
        />
        <InfoItem
          icon={DollarSign}
          label={t.jobDetails.salary}
          value={`₪${job.salary}`}
        />
        <InfoItem
          icon={Calendar}
          label={t.jobDetails.postedOn}
          value={formatDate(job.createdAt)}
        />
        <InfoItem
          icon={Car}
          label={t.jobDetails.transportation}
          value={job.transportationAvailable ? t.common.yes : t.common.no}
        />
        <InfoItem
          icon={Languages}
          label={t.jobDetails.hebrewRequired}
          value={job.hebrewRequired ? t.common.yes : t.common.no}
        />
      </div>

      {/* Required Qualifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t.jobDetails.requiredQualifications}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {job.requiredQualifications}
        </p>
      </div>
    </div>
  );
}
