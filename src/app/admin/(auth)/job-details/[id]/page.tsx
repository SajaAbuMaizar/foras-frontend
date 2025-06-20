"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import JobImage from "./components/JobImage";
import JobOriginalDetails from "./components/JobOriginalDetails";
import JobTranslatedDetails from "./components/JobTranslatedDetails";
import { JobDetailsItem } from "@/types/jobs/JobDetailsItem";

const JobDetailsPage: React.FC<{ job: JobDetailsItem }> = ({ job }) => {
  const [showTranslationFields, setShowTranslationFields] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    await fetch(`/api/admin/approve-job/${job.id}`, { method: "POST" });
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this job?")) {
      await fetch(`/api/admin/delete-job/${job.id}`, { method: "POST" });
      router.push("/admin/jobs");
    }
  };

  const handleTranslate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await fetch(`/api/admin/translate-job/${job.id}`, {
      method: "POST",
      body: formData,
    });
    router.refresh();
  };

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
          <JobImage src={job.jobImageUrl} />

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
