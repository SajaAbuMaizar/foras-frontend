"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { MainPageJobListItem } from "@/types/jobs/MainPageJobListItem"; // adjust import path if needed

export default function AppliedJobsPage() {
  const [jobs, setJobs] = useState<MainPageJobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/job-applications/my-applied-jobs", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch applied jobs");
        const data = await res.json();
        setJobs(data);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 rtl:pr-64" dir="rtl">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-right">
          الوظائف التي تقدمت لها
        </h1>
        {isLoading ? (
          <div>جاري التحميل...</div>
        ) : error ? (
          <div className="text-red-600">خطأ: {error}</div>
        ) : jobs.length === 0 ? (
          <div className="text-gray-600 text-center">
            لم تقم بالتقديم لأي وظيفة بعد.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
