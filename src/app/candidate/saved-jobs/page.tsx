"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { MainPageJobListItem } from "@/types/jobs/MainPageJobListItem";

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState<MainPageJobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/candidate/saved-jobs", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch saved jobs");
        const data = await res.json();
        setJobs(data);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleLoginRequired = () => {
    // This shouldn't happen since user is already authenticated to access this page
    console.warn("Login required callback called on saved jobs page");
  };

  return (
    <div className="min-h-screen bg-gray-100 rtl:pr-64" dir="rtl">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-right">الوظائف المحفوظة</h1>
        {isLoading ? (
          <div className="text-center">جاري التحميل...</div>
        ) : error ? (
          <div className="text-red-600 text-center">خطأ: {error}</div>
        ) : jobs.length === 0 ? (
          <div className="text-gray-600 text-center">
            لم تقم بحفظ أي وظيفة بعد.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onLoginRequired={handleLoginRequired}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
