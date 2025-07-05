"use client";

import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import ApplicationCard from "./ApplicationCard";
import { JobApplication } from "@/types/JobApplication";

interface ApplicationsListProps {
  applications: JobApplication[];
  selectedApplication: JobApplication | null;
  onSelectApplication: (application: JobApplication) => void;
  onStatusChange: (
    applicationId: string,
    status: "pending" | "accepted" | "rejected"
  ) => void;
}

export default function ApplicationsList({
  applications,
  selectedApplication,
  onSelectApplication,
  onStatusChange,
}: ApplicationsListProps) {
  const { lang } = useLanguage();
  const t = useEmployerTranslations();

  if (applications.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {t.jobApplications.noApplications}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          isSelected={selectedApplication?.id === application.id}
          onClick={() => onSelectApplication(application)}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
