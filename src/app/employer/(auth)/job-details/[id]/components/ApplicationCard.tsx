"use client";

import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { User, Mail, Phone, Calendar, MapPin, FileText } from "lucide-react";
import { JobApplication } from "@/types/JobApplication";
// Removed date-fns imports - using custom date formatting

interface ApplicationCardProps {
  application: JobApplication;
  isSelected: boolean;
  onClick: () => void;
  onStatusChange: (
    applicationId: string,
    status: "pending" | "accepted" | "rejected"
  ) => void;
}

export default function ApplicationCard({
  application,
  isSelected,
  onClick,
  onStatusChange,
}: ApplicationCardProps) {
  const { lang } = useLanguage();
  const t = useEmployerTranslations();
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
      { label: { ar: "سنة", he: "שנה" }, seconds: 31536000 },
      { label: { ar: "شهر", he: "חודש" }, seconds: 2592000 },
      { label: { ar: "أسبوع", he: "שבוע" }, seconds: 604800 },
      { label: { ar: "يوم", he: "יום" }, seconds: 86400 },
      { label: { ar: "ساعة", he: "שעה" }, seconds: 3600 },
      { label: { ar: "دقيقة", he: "דקה" }, seconds: 60 },
      { label: { ar: "ثانية", he: "שנייה" }, seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        const label = interval.label[lang as "ar" | "he"];
        const prefix = lang === "ar" ? "منذ" : "לפני";
        return `${prefix} ${count} ${label}`;
      }
    }

    return lang === "ar" ? "الآن" : "עכשיו";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const handleQuickAction = (
    e: React.MouseEvent,
    status: "pending" | "accepted" | "rejected"
  ) => {
    e.stopPropagation();
    onStatusChange(application.id, status);
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {application.candidateAvatar ? (
              <img
                src={application.candidateAvatar}
                alt={application.candidateName}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-gray-500 dark:text-gray-300" />
              </div>
            )}
          </div>

          {/* Candidate Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {application.candidateName}
            </h3>

            <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{application.candidateEmail}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{application.candidatePhone}</span>
              </div>

              {application.candidateLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{application.candidateLocation}</span>
                </div>
              )}
            </div>

            {/* Applied Time */}
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>{formatTimeAgo(application.appliedAt)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-3">
          {/* Status Badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              application.status
            )}`}
          >
            {t.jobApplications.status[application.status]}
          </span>

          {/* Quick Actions */}
          {application.status === "pending" && (
            <div className="flex gap-2">
              <button
                onClick={(e) => handleQuickAction(e, "accepted")}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {t.jobApplications.actions.accept}
              </button>
              <button
                onClick={(e) => handleQuickAction(e, "rejected")}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {t.jobApplications.actions.reject}
              </button>
            </div>
          )}

          {/* Resume */}
          {application.resumeUrl && (
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              <FileText className="h-4 w-4" />
              {t.jobApplications.viewResume}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
