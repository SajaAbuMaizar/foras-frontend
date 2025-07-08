"use client";

import { JobApplicationResponse } from "@/types/JobApplicationResponse";
import { Phone, MapPin, Calendar, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar, he } from "date-fns/locale";
import { useLanguage } from "@/context/language/LanguageContext";
import CandidateActions from "../CandidateCard/CandidateActions";

interface SimpleCandidateCardProps {
  application: JobApplicationResponse;
  onStatusChange?: (applicationId: string, status: string) => void;
}

export default function SimpleCandidateCard({
  application,
  onStatusChange,
}: SimpleCandidateCardProps) {
  const { lang } = useLanguage();
  const locale = lang === "ar" ? ar : he;

  const timeAgo = formatDistanceToNow(new Date(application.appliedAt), {
    addSuffix: true,
    locale,
  });

  const getStatusStyle = () => {
    switch (application.status) {
      case "ACCEPTED":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300";
      case "REJECTED":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300";
      default:
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300";
    }
  };

  const getStatusText = () => {
    switch (application.status) {
      case "ACCEPTED":
        return lang === "ar" ? "مقبول" : "התקבל";
      case "REJECTED":
        return lang === "ar" ? "مرفوض" : "נדחה";
      default:
        return lang === "ar" ? "قيد الانتظار" : "ממתין";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            {application.candidateAvatar ? (
              <img
                src={application.candidateAvatar}
                alt={application.candidateName}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {application.candidateName}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {application.candidateLocation && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{application.candidateLocation}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
        </div>

        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle()}`}
        >
          {getStatusText()}
        </span>
      </div>

      {/* Contact */}
      <div className="mb-4">
        <a
          href={`tel:${application.candidatePhone}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <Phone className="h-4 w-4" />
          <span className="font-medium">{application.candidatePhone}</span>
        </a>
      </div>

      {/* Cover Letter if exists */}
      {application.coverLetter && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {application.coverLetter}
          </p>
        </div>
      )}

      {/* Actions */}
      <CandidateActions
        applicationId={application.id}
        status={application.status as any}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
