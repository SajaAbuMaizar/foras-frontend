"use client";

import { DashboardStats } from "@/types/admin/dashboard";
import { Users, TrendingUp, TrendingDown } from "lucide-react";

interface CandidateChartProps {
  stats: DashboardStats | null;
}

export default function CandidateChart({ stats }: CandidateChartProps) {
  const candidateData = [
    {
      label: "يعرفون العبرية",
      value: stats?.candidatesKnowHebrew || 0,
      color: "bg-blue-500",
    },
    {
      label: "لا يعرفون العبرية",
      value: stats?.candidatesNoHebrew || 0,
      color: "bg-gray-400",
    },
  ];

  const total = candidateData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            توزيع المرشحين
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {stats && stats.candidatesChange >= 0 ? (
            <>
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-600">+{stats.candidatesChange}%</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-red-600">{stats?.candidatesChange}%</span>
            </>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {candidateData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{item.label}</span>
              <span className="font-medium">
                {item.value} (
                {total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full transition-all duration-500`}
                style={{
                  width: `${total > 0 ? (item.value / total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Gender Distribution */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          توزيع حسب الجنس
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {stats?.candidatesMale || 0}
            </p>
            <p className="text-sm text-gray-600">ذكور</p>
          </div>
          <div className="text-center p-3 bg-pink-50 rounded-lg">
            <p className="text-2xl font-bold text-pink-600">
              {stats?.candidatesFemale || 0}
            </p>
            <p className="text-sm text-gray-600">إناث</p>
          </div>
        </div>
      </div>

      {/* Skills Distribution */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          المرشحون حسب المهارات
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">لديهم مهارات</span>
            <span className="font-medium">
              {stats?.candidatesWithSkills || 0}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">يحتاجون مساعدة</span>
            <span className="font-medium">
              {stats?.candidatesNeedHelp || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
