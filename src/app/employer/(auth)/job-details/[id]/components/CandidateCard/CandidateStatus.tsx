"use client";

import { CheckCircle, XCircle, HelpCircle, Languages } from "lucide-react";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { ApplicationStatus } from "@/types/ApplicationStatus";

interface CandidateStatusProps {
  status: ApplicationStatus;
}

export default function CandidateStatus({ status }: CandidateStatusProps) {
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
    </div>
  );
}
