"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import ApplicationsList from "../../job-details/[id]/components/ApplicationsList";
import { getJobDetailsForEmployer } from "@/lib/api";
import { EmployerJobDetailsItem } from "@/types/EmployerJobDetailsItem";

export default function JobApplicationsPage() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useLanguage();
  const t = useEmployerTranslations();
  const jobId = params?.id as string;

  const [job, setJob] = useState<EmployerJobDetailsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const jobData = await getJobDetailsForEmployer(jobId);
      setJob(jobData);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">
            {t.jobDetails.notFound}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-8 mr-64"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm mb-4">
            <button
              onClick={() => router.push("/employer/dashboard")}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {t.nav.dashboard}
            </button>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <button
              onClick={() => router.push("/employer/my-jobs")}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {t.nav.myJobs}
            </button>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <button
              onClick={() => router.push(`/employer/job-details/${jobId}`)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {job.jobTitle}
            </button>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">
              {t.jobApplications.title}
            </span>
          </nav>

          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t.jobApplications.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {job.jobTitle} - {t.jobDetails.jobId}: {job.id}
              </p>
            </div>

            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              {lang === "ar" ? "رجوع" : "חזור"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ApplicationsList jobId={jobId} jobTitle={job.jobTitle} />
      </div>
    </div>
  );
}
