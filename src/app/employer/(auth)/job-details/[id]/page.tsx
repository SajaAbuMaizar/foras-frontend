"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { getJobDetailsForEmployer } from "@/lib/api";
import { EmployerJobDetailsItem } from "@/types/EmployerJobDetailsItem";
import JobDetailsHeader from "./components/JobDetailsHeader";
import JobDetailsCard from "./components/JobDetailsCard";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import ApplicationsList from "./components/ApplicationsList";

type Props = {
  params: Promise<{ id: string }>;
};

export default function EmployerJobDetailsPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const t = useEmployerTranslations();
  const [job, setJob] = useState<EmployerJobDetailsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getJobDetailsForEmployer(id);
      setJob(data);
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError(t.jobDetails.errorLoading);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchJobDetails} />;
  if (!job) return <ErrorState error={t.jobDetails.notFound} />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mr-64" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <JobDetailsHeader
          jobTitle={job.jobTitle}
          jobId={id}
          onBack={() => router.back()}
        />

        <JobDetailsCard job={job} />

        <ApplicationsList jobId={id} jobTitle={job.jobTitle} />
      </div>
    </div>
  );
}
