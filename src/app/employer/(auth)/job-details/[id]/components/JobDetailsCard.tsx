"use client";

import { EmployerJobDetailsItem } from "@/types/EmployerJobDetailsItem";
import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import JobInfoSection from "./JobInfoSection";
import ApplicantsList from "./ApplicantsList";

interface JobDetailsCardProps {
  job: EmployerJobDetailsItem;
}

export default function JobDetailsCard({ job }: JobDetailsCardProps) {
  const { lang } = useLanguage();
  const t = useEmployerTranslations();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Job Image */}
          <div className="lg:col-span-1">
            <img
              src={job.imageUrl}
              alt={job.jobTitle}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Job Information */}
          <div className="lg:col-span-2">
            <JobInfoSection job={job} />
          </div>
        </div>
      </div>

      {/* Applicants Section */}
      <ApplicantsList candidates={job.candidates} />
    </div>
  );
}
