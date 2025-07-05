"use client";

import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  MessageSquare,
  Star,
} from "lucide-react";
import { JobApplication } from "@/types/JobApplication";
// Removed date-fns imports - using custom date formatting

interface ApplicationDetailsProps {
  application: JobApplication;
  onStatusChange: (
    applicationId: string,
    status: "pending" | "accepted" | "rejected"
  ) => void;
  onClose: () => void;
}

export default function ApplicationDetails({
  application,
  onStatusChange,
  onClose,
}: ApplicationDetailsProps) {
  const { lang } = useLanguage();
  const t = useEmployerTranslations();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString(lang === "ar" ? "ar-SA" : "he-IL", options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t.jobApplications.applicationDetails}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Candidate Avatar & Name */}
      <div className="flex items-center gap-4 mb-6">
        {application.candidateAvatar ? (
          <img
            src={application.candidateAvatar}
            alt={application.candidateName}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-gray-500 dark:text-gray-300" />
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {application.candidateName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.jobApplications.appliedOn}: {formatDate(application.appliedAt)}
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          {t.jobApplications.contactInfo}
        </h4>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <a
              href={`mailto:${application.candidateEmail}`}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              {application.candidateEmail}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <a
              href={`tel:${application.candidatePhone}`}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              {application.candidatePhone}
            </a>
          </div>

          {application.candidateLocation && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {application.candidateLocation}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Skills & Experience */}
      {application.skills && application.skills.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            {t.jobApplications.skills}
          </h4>
          <div className="flex flex-wrap gap-2">
            {application.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cover Letter */}
      {application.coverLetter && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            <MessageSquare className="inline h-5 w-5 mr-2" />
            {t.jobApplications.coverLetter}
          </h4>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {application.coverLetter}
          </p>
        </div>
      )}

      {/* Documents */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          {t.jobApplications.documents}
        </h4>

        {application.resumeUrl ? (
          <a
            href={application.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium">
              {t.jobApplications.viewResume}
            </span>
          </a>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.jobApplications.noResume}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {application.status === "pending" && (
          <>
            <button
              onClick={() => onStatusChange(application.id, "accepted")}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              {t.jobApplications.actions.accept}
            </button>
            <button
              onClick={() => onStatusChange(application.id, "rejected")}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              {t.jobApplications.actions.reject}
            </button>
          </>
        )}

        <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
          {t.jobApplications.actions.contact}
        </button>
      </div>
    </div>
  );
}
