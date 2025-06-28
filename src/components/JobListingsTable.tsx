// src/components/JobListingsTable.tsx
"use client";

import React from "react";
import JobStatusBadge from "./JobStatusBadge";
import { JobListItem } from "@/types/jobs/JobListItem";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/context/language/LanguageContext";
import { translations } from "@/translations";
import { TableRowSkeleton } from "@/components/ui/Skeleton";

type JobListingsTableProps = {
  jobListings: JobListItem[];
  isLoading?: boolean;
  role: "employer" | "admin";
};

const JobListingsTable: React.FC<JobListingsTableProps> = ({
  jobListings,
  isLoading = false,
  role,
}) => {
  const { lang } = useLanguage();
  const t = translations[lang].jobListingsPage;

  const getJobDetailsUrl = (id: string) => {
    return role === "admin"
      ? `/admin/job-details/${id}`
      : `/employer/job-details/${id}`;
  };

  const handleBoostDate = async (jobId: string) => {
    try {
      const res = await fetch(`/api/job/${jobId}/update-date`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to update date");

      toast.success(t.boostSuccess);
      window.location.reload();
    } catch (err) {
      toast.error(t.boostFail);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {t.table.title}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {t.table.city}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {t.table.description}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {t.table.salary}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {t.table.moreInfo}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {t.table.boost}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {t.table.status}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Show skeleton rows when loading
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRowSkeleton key={`skeleton-${index}`} columns={7} />
                ))}
              </>
            ) : jobListings.length === 0 ? (
              // Show empty state
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  {t.noJobs}
                </td>
              </tr>
            ) : (
              // Show actual data rows
              jobListings.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={getJobDetailsUrl(job.id)}
                      className="text-violet-600 hover:text-violet-800 hover:underline font-medium"
                    >
                      {job.jobTitle}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lang === "ar"
                      ? job.cityName.nameAr || job.cityName.nameHe
                      : job.cityName.nameHe}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-gray-600">
                    {job.jobDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {job.salary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={getJobDetailsUrl(job.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 transition-colors"
                    >
                      {t.table.moreInfo}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleBoostDate(job.id)}
                      disabled={isLoading}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {t.table.boost}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <JobStatusBadge status={job.status} lang={lang} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListingsTable;
