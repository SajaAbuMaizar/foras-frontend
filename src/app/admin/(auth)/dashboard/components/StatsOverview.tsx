"use client";

import { DashboardStats } from "@/types/admin/dashboard";
import {
  Users,
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  Activity,
} from "lucide-react";

interface StatsOverviewProps {
  stats: DashboardStats | null;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      title: "إجمالي المرشحين",
      value: stats?.totalCandidates || 0,
      icon: Users,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      change: stats?.candidatesChange || 0,
    },
    {
      title: "إجمالي أصحاب العمل",
      value: stats?.totalEmployers || 0,
      icon: Building2,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      change: stats?.employersChange || 0,
    },
    {
      title: "إجمالي الوظائف",
      value: stats?.totalJobs || 0,
      icon: Briefcase,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
      change: stats?.jobsChange || 0,
    },
    {
      title: "الوظائف المعتمدة",
      value: stats?.approvedJobs || 0,
      icon: CheckCircle,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      percentage: stats
        ? ((stats.approvedJobs / stats.totalJobs) * 100).toFixed(1)
        : "0",
    },
    {
      title: "بانتظار المراجعة",
      value: stats?.pendingJobs || 0,
      icon: Clock,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      percentage: stats
        ? ((stats.pendingJobs / stats.totalJobs) * 100).toFixed(1)
        : "0",
    },
    {
      title: "الوظائف المرفوضة",
      value: stats?.rejectedJobs || 0,
      icon: XCircle,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      percentage: stats
        ? ((stats.rejectedJobs / stats.totalJobs) * 100).toFixed(1)
        : "0",
    },
    {
      title: "إجمالي الرسائل",
      value: stats?.totalMessages || 0,
      icon: MessageSquare,
      color: "bg-cyan-500",
      bgColor: "bg-cyan-50",
      change: stats?.messagesChange || 0,
    },
    {
      title: "المستخدمون النشطون",
      value: stats?.activeUsers || 0,
      icon: Activity,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      subtitle: "آخر 24 ساعة",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {stat.value.toLocaleString("ar-SA")}
              </p>
              {stat.change !== undefined && (
                <p
                  className={`text-sm mt-2 ${
                    stat.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change >= 0 ? "+" : ""}
                  {stat.change}% من الشهر الماضي
                </p>
              )}
              {stat.percentage && (
                <p className="text-sm text-gray-500 mt-2">
                  {stat.percentage}% من الإجمالي
                </p>
              )}
              {stat.subtitle && (
                <p className="text-sm text-gray-500 mt-2">{stat.subtitle}</p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color} text-white`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
