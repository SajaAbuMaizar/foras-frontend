"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import JobImage from "./components/JobImage";
import JobOriginalDetails from "./components/JobOriginalDetails";
import JobTranslatedDetails from "./components/JobTranslatedDetails";
import { AdminJobDetailsItem } from "@/types/AdminJobDetailsItem";

const JobDetailsPage: React.FC = () => {
  const [job, setJob] = useState<AdminJobDetailsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranslationFields, setShowTranslationFields] = useState(false);
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/job/admin/job-details/${jobId}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchJob();
  }, [jobId]);

  const handleApprove = async () => {
    await fetch(`/api/admin/approve-job/${job?.id}`, { method: "POST" });
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this job?")) {
      await fetch(`/api/admin/delete-job/${job?.id}`, { method: "POST" });
      router.push("/admin/jobs");
    }
  };

  const handleTranslate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await fetch(`/api/admin/translate-job/${job?.id}`, {
      method: "POST",
      body: formData,
    });
    router.refresh();
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!job) return <div className="p-8 text-red-600">Job not found</div>;

  return (
    <div className="layout-page">
      <div className="content-wrapper px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">
          פרטי משרה
          {job.status === "APPROVED" && (
            <span className="text-green-600 mr-6"> מאושרת</span>
          )}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 relative">
          <JobImage src={job.imageUrl} />
          <div className="relative flex-1 md:flex gap-6">
            <JobOriginalDetails job={job} />
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-300" />
            <JobTranslatedDetails job={job} showTranslationFields={showTranslationFields} handleTranslate={handleTranslate} />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow hover:shadow-lg transition"
              onClick={() => setShowTranslationFields(!showTranslationFields)}
            >
              תרגם משרה
            </button>

            <button
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow hover:shadow-lg transition"
              onClick={handleApprove}
            >
              אשר משרה
            </button>

            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow hover:shadow-lg transition"
              onClick={handleDelete}
            >
              מחק משרה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
