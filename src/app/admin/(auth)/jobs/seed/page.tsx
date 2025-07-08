"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SeedJobForm from "./components/SeedJobForm";
import { adminJobsApi } from "@/lib/api/admin/jobs";
import { toast } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CreateSeedJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await adminJobsApi.createSeedJob(data);

      if (response.success) {
        toast.success("משרה נוצרה בהצלחה!");
        router.push("/admin/jobs");
      } else {
        toast.error(response.message || "שגיאה ביצירת המשרה");
      }
    } catch (error) {
      console.error("Error creating seed job:", error);
      toast.error("שגיאה ביצירת המשרה");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/jobs"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          חזרה למשרות
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">יצירת משרה</h1>
        <p className="text-gray-600 mt-2">צור משרות עם מעסיקים פיקטיביים</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <SeedJobForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
