"use client";

import { useEffect, useState } from "react";
import { adminDashboardApi } from "@/lib/api/admin/dashboard";
import {
  Activity,
  User,
  Briefcase,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { ActivityItem } from "@/types/admin/dashboard";

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivities();

    // Refresh activities every 30 seconds
    const interval = setInterval(fetchRecentActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecentActivities = async () => {
    try {
      const data = await adminDashboardApi.getActivities(10);
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new_candidate":
        return <User className="h-4 w-4" />;
      case "new_employer":
        return <User className="h-4 w-4" />;
      case "new_job":
        return <Briefcase className="h-4 w-4" />;
      case "new_message":
        return <MessageSquare className="h-4 w-4" />;
      case "job_approved":
        return <CheckCircle className="h-4 w-4" />;
      case "job_rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "new_candidate":
        return "bg-blue-100 text-blue-600";
      case "new_employer":
        return "bg-purple-100 text-purple-600";
      case "new_job":
        return "bg-green-100 text-green-600";
      case "new_message":
        return "bg-yellow-100 text-yellow-600";
      case "job_approved":
        return "bg-emerald-100 text-emerald-600";
      case "job_rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 60) return "منذ لحظات";
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
    if (diff < 604800) return `منذ ${Math.floor(diff / 86400)} يوم`;
    return past.toLocaleDateString("ar-SA");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">النشاط الأخير</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
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
            <Activity className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              النشاط الأخير
            </h2>
          </div>
          <button
            onClick={fetchRecentActivities}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            تحديث
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            لا توجد أنشطة حديثة
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-3">
                  <div
                    className={`p-2 rounded-full ${getActivityColor(
                      activity.type
                    )}`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      {activity.description}
                    </p>
                    {activity.userName && (
                      <p className="text-xs text-gray-600 mt-1">
                        بواسطة: {activity.userName}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <p className="text-xs text-gray-500">
                        {formatTimeAgo(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
