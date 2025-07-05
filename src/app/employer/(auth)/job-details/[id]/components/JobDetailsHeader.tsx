"use client";

import { ArrowLeft, ArrowRight, Briefcase, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

interface JobDetailsHeaderProps {
  jobTitle: string;
  jobId: string;
  onBack: () => void;
}

export default function JobDetailsHeader({
  jobTitle,
  jobId,
  onBack,
}: JobDetailsHeaderProps) {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = useEmployerTranslations();
  const isRTL = lang === "ar";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isRTL ? (
              <ArrowRight className="h-5 w-5" />
            ) : (
              <ArrowLeft className="h-5 w-5" />
            )}
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {jobTitle}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.jobDetails.jobId}: {jobId}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push(`/employer/job-applications/${jobId}`)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Users className="h-5 w-5" />
          {t.jobDetails.viewApplications}
        </button>
      </div>
    </div>
  );
}
