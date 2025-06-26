"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import JobImage from "./components/JobImage";
import JobOriginalDetails from "./components/JobOriginalDetails";
import JobTranslatedDetails from "./components/JobTranslatedDetails";
import { AdminJobDetailsItem } from "@/types/AdminJobDetailsItem";

const JobDetailsPage: React.FC = () => {
  const [job, setJob] = useState<AdminJobDetailsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranslationFields, setShowTranslationFields] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/job/admin/job-details/${jobId}`);
        const data = await res.json();
        setJob(data);
        console.log("Fetched job details:", data);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchJob();
  }, [jobId]);

  const handleApprove = async () => {
    try {
      await fetch(`/api/job/admin/approve-job/${job?.id}`, { method: "POST" });
      toast.success("המשרה אושרה בהצלחה");
      router.refresh();
    } catch (error) {
      toast.error("שגיאה באישור המשרה");
    }
  };

  const handleDelete = async () => {
    if (confirm("האם אתה בטוח שברצונך למחוק משרה זו?")) {
      try {
        await fetch(`/api/admin/delete-job/${job?.id}`, { method: "POST" });
        toast.success("המשרה נמחקה בהצלחה");
        router.push("/admin/jobs");
      } catch (error) {
        toast.error("שגיאה במחיקת המשרה");
      }
    }
  };

  const handleTranslate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTranslating(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(`/api/job/admin/translate-job/${job?.id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("התרגום נשמר בהצלחה");
        setShowTranslationFields(false);
        router.refresh();
      } else {
        throw new Error("Translation failed");
      }
    } catch (error) {
      toast.error("שגיאה בשמירת התרגום");
    } finally {
      setIsTranslating(false);
    }
  };

  if (loading) return <div className="p-8">טוען...</div>;
  if (!job) return <div className="p-8 text-red-600">המשרה לא נמצאה</div>;

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
            <JobTranslatedDetails
              job={job}
              showTranslationFields={showTranslationFields}
              handleTranslate={handleTranslate}
              isTranslating={isTranslating}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow hover:shadow-lg transition disabled:opacity-50"
              onClick={() => setShowTranslationFields(!showTranslationFields)}
              disabled={isTranslating}
            >
              {showTranslationFields ? "בטל תרגום" : "תרגם משרה"}
            </button>

            <button
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow hover:shadow-lg transition disabled:opacity-50"
              onClick={handleApprove}
              disabled={isTranslating}
            >
              אשר משרה
            </button>

            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow hover:shadow-lg transition disabled:opacity-50"
              onClick={handleDelete}
              disabled={isTranslating}
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
