"use client";

import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { JobApplication } from "@/types/JobApplication";

interface ApplicationStatsProps {
  applications: JobApplication[];
}

export default function ApplicationStats({
  applications,
}: ApplicationStatsProps) {
  const { lang } = useLanguage();
  const t = useEmployerTranslations();

  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    accepted: applications.filter((app) => app.status === "accepted").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

  const statCards = [
    {
      label: t.jobApplications.stats.total,
      value: stats.total,
      icon: Users,
      bgColor: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-300",
    },
    {
      label: t.jobApplications.stats.pending,
      value: stats.pending,
      icon: Clock,
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
      iconColor: "text-yellow-600 dark:text-yellow-300",
    },
    {
      label: t.jobApplications.stats.accepted,
      value: stats.accepted,
      icon: CheckCircle,
      bgColor: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-300",
    },
    {
      label: t.jobApplications.stats.rejected,
      value: stats.rejected,
      icon: XCircle,
      bgColor: "bg-red-100 dark:bg-red-900",
      iconColor: "text-red-600 dark:text-red-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
