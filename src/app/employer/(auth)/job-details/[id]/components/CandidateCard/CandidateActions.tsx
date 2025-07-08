"use client";

import { Check, X } from "lucide-react";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { ApplicationStatus } from "@/types/ApplicationStatus";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateApplicationStatus } from "@/lib/api";

interface CandidateActionsProps {
  applicationId: string;
  status: ApplicationStatus;
  onStatusChange?: (applicationId: string, status: string) => void;
}

export default function CandidateActions({
  applicationId,
  status,
  onStatusChange,
}: CandidateActionsProps) {
  const t = useEmployerTranslations();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: ApplicationStatus) => {
    setIsUpdating(true);
    try {
      await updateApplicationStatus(applicationId, newStatus);

      toast.success(
        newStatus === "ACCEPTED"
          ? t.jobApplications.actions.accept
          : t.jobApplications.actions.reject
      );

      if (onStatusChange) {
        onStatusChange(applicationId, newStatus);
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (status !== "PENDING") {
    return null;
  }

  return (
    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={() => handleStatusUpdate("ACCEPTED")}
        disabled={isUpdating}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
      >
        <Check className="h-4 w-4" />
        {t.jobApplications.actions.accept}
      </button>

      <button
        onClick={() => handleStatusUpdate("REJECTED")}
        disabled={isUpdating}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
      >
        <X className="h-4 w-4" />
        {t.jobApplications.actions.reject}
      </button>
    </div>
  );
}
