// src/app/admin/(auth)/jobs/page.tsx
"use client";

import useSWR from "swr";
import axios from "axios";
import JobListingsTable from "@/components/JobListingsTable";
import { JobListItem } from "@/types/jobs/JobListItem";
import { Plus } from "lucide-react";
import Link from "next/link";

// Define a typed fetcher that returns a promise of JobListItem[]
const fetcher = (url: string): Promise<JobListItem[]> =>
  Promise.resolve(axios.get(url, { withCredentials: true })).then(
    (res) => res.data as JobListItem[]
  );

export default function AdminJobsPage() {
  const {
    data: jobs,
    error,
    isLoading,
  } = useSWR<JobListItem[]>("/api/job/admin/jobs", fetcher);

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-right">משרות</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-700">
            שגיאה בטעינת המשרות. אנא נסה שוב מאוחר יותר.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-right">משרות</h1>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ניהול משרות</h1>
        <Link
          href="/admin/jobs/seed"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
             rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          צור משרה לדוגמה
        </Link>
      </div>
      <JobListingsTable
        jobListings={jobs ?? []}
        role="admin"
        isLoading={isLoading}
      />
    </div>
  );
}
