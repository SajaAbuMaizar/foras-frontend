"use client";

import { DashboardStats } from "@/types/admin/dashboard";
import { Building2, TrendingUp, MapPin } from "lucide-react";

interface EmployerChartProps {
  stats: DashboardStats | null;
}

export default function EmployerChart({ stats }: EmployerChartProps) {
  const topCities = stats?.topEmployerCities || [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            توزيع أصحاب العمل
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-green-600">
            +{stats?.employersChange || 0}%
          </span>
        </div>
      </div>

      {/* Active vs Inactive */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-3xl font-bold text-green-600">
            {stats?.activeEmployers || 0}
          </p>
          <p className="text-sm text-gray-600 mt-1">نشطون</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-3xl font-bold text-gray-600">
            {stats?.inactiveEmployers || 0}
          </p>
          <p className="text-sm text-gray-600 mt-1">غير نشطين</p>
        </div>
      </div>

      {/* Top Cities */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-4 w-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-700">أعلى المدن</h3>
        </div>
        <div className="space-y-3">
          {topCities.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">لا توجد بيانات</p>
          ) : (
            topCities.map((city, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 w-6">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700">{city.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {city.count}
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (city.count / (topCities[0]?.count || 1)) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Jobs per Employer */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          متوسط الوظائف
        </h3>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-3xl font-bold text-purple-600">
            {stats?.avgJobsPerEmployer?.toFixed(1) || "0"}
          </p>
          <p className="text-sm text-gray-600 mt-1">وظيفة لكل صاحب عمل</p>
        </div>
      </div>
    </div>
  );
}
