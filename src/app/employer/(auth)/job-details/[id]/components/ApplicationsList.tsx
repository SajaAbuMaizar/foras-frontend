"use client";

import { useState, useEffect } from "react";
import { JobApplicationResponse } from "@/types/JobApplicationResponse";
import { JobApplicationWithCandidate } from "@/types/JobApplicationWithCandidate";
import CandidateCard from "./CandidateCard";
import ExportActions from "./ExportActions";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { Users, Loader2 } from "lucide-react";
import { getJobApplications } from "@/lib/api";
import { mapJobApplicationToWithCandidate } from "@/utils/applicationMapper";

interface ApplicationsListProps {
  jobId: string;
  jobTitle: string;
}

export default function ApplicationsList({
  jobId,
  jobTitle,
}: ApplicationsListProps) {
  const t = useEmployerTranslations();
  const [applications, setApplications] = useState<
    JobApplicationWithCandidate[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      const data = await getJobApplications(jobId);
      const mappedApplications = data.map(mapJobApplicationToWithCandidate);
      setApplications(mappedApplications);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus as any } : app
      )
    );
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {t.jobApplications.loading}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-6 w-6" />
            {t.jobDetails.applicants}
          </h3>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
            {applications.length} {t.jobDetails.totalApplicants}
          </span>
        </div>

        <ExportActions applications={applications} jobTitle={jobTitle} />
      </div>

      {applications.length > 0 ? (
        <div className="grid gap-6">
          {applications.map((application) => (
            <CandidateCard
              key={application.id}
              application={application}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {t.jobDetails.noApplicantsYet}
          </p>
        </div>
      )}
    </div>
  );
}
