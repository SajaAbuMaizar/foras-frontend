"use client";

import { useEffect, useState } from "react";
import { adminDashboardApi } from "@/lib/api/admin/dashboard";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { JobListItem } from "@/types/jobs/JobListItem";

export default function RecentJobs() {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentJobs();
  }, []);

  const fetchRecentJobs = async () => {
    try {
      setLoading(true);
      const data = await adminDashboardApi.getRecentJobs(5);
      setJobs(data);
    } catch (error) {
      console.error("Error fetching recent jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "APPROVED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "قيد المراجعة";
      case "APPROVED":
        return "معتمدة";
      case "REJECTED":
        return "مرفوضة";
      default:
        return status;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              أحدث الوظائف
            </h2>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              أحدث الوظائف
            </h2>
          </div>
          <Link
            href="/admin/jobs"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            عرض الكل
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {jobs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            لا توجد وظائف حديثة
          </div>
        ) : (
          jobs.map((job) => (
            <Link
              key={job.id}
              href={`/admin/jobs/${job.id}`}
              className="block p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {job.jobTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <span>{job.cityName.nameAr}</span>
                    <span className="text-gray-400">•</span>
                    <span>{job.salary}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {job.jobDescription}
                  </p>
                </div>
                <div className="mr-4 flex-shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      job.status
                    )}`}
                  >
                    {getStatusIcon(job.status)}
                    {getStatusText(job.status)}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
