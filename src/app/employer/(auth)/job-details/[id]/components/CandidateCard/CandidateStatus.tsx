"use client";

import { CheckCircle, XCircle, HelpCircle, Languages } from "lucide-react";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { ApplicationStatus } from "@/types/ApplicationStatus";

interface CandidateStatusProps {
  status: ApplicationStatus;
  knowsHebrew: boolean;
  needsHelp: boolean;
}

export default function CandidateStatus({
  status,
  knowsHebrew,
  needsHelp,
}: CandidateStatusProps) {
  const t = useEmployerTranslations();

  const getStatusStyle = () => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300";
      case "REJECTED":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300";
      default:
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300";
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle()}`}
      >
        {status === "ACCEPTED" && <CheckCircle className="h-4 w-4" />}
        {status === "REJECTED" && <XCircle className="h-4 w-4" />}
        {
          t.jobApplications.status[
            status.toLowerCase() as keyof typeof t.jobApplications.status
          ]
        }
      </span>

      {knowsHebrew && (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
          <Languages className="h-4 w-4" />
          {t.jobDetails.hebrewRequired}
        </span>
      )}

      {needsHelp && (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
          <HelpCircle className="h-4 w-4" />
          {t.filters.needsHelp}
        </span>
      )}
    </div>
  );
}
