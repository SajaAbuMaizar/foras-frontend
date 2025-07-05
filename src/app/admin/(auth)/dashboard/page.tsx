"use client";

import { useEffect, useState } from "react";
import { adminDashboardApi } from "@/lib/api/admin/dashboard";
import StatsOverview from "./components/StatsOverview";
import RecentJobs from "./components/RecentJobs";
import CandidateChart from "./components/CandidateChart";
import EmployerChart from "./components/EmployerChart";
import MessageStats from "./components/MessageStats";
import ActivityFeed from "./components/ActivityFeed";
import QuickActions from "./components/QuickActions";
import { DashboardStats } from "@/types/admin/dashboard";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminDashboardApi.getStats();
      setStats(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ في تحميل البيانات";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    toast.loading("جاري تحديث البيانات...", { id: "refresh" });
    await fetchDashboardStats();
    toast.success("تم تحديث البيانات بنجاح", { id: "refresh" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 mb-4">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600 mt-1">نظرة عامة على أداء المنصة</p>
        </div>
        <QuickActions onRefresh={handleRefresh} />
      </div>

      {/* Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CandidateChart stats={stats} />
        <EmployerChart stats={stats} />
      </div>

      {/* Recent Jobs & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentJobs />
        </div>
        <div>
          <MessageStats stats={stats} />
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}
