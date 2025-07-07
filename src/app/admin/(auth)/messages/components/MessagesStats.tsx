"use client";

import {
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle,
  Archive,
  Eye,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface MessagesStatsProps {
  stats: {
    totalMessages: number;
    newMessages: number;
    inProgressMessages: number;
    doneMessages: number;
    archivedMessages: number;
    unreadMessages: number;
    todayMessages: number;
    weekMessages: number;
    monthMessages: number;
  };
}

export default function MessagesStats({ stats }: MessagesStatsProps) {
  const statCards = [
    {
      label: "إجمالي الرسائل",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "رسائل جديدة",
      value: stats.newMessages,
      icon: AlertCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "قيد المعالجة",
      value: stats.inProgressMessages,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "مكتملة",
      value: stats.doneMessages,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "مؤرشفة",
      value: stats.archivedMessages,
      icon: Archive,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      label: "غير مقروءة",
      value: stats.unreadMessages,
      icon: Eye,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}

      {/* Time-based Stats */}
      <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border-r-4 border-blue-500">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">اليوم</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.todayMessages}
          </div>
          <div className="text-sm text-gray-600">رسالة جديدة</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-r-4 border-green-500">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">هذا الأسبوع</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.weekMessages}
          </div>
          <div className="text-sm text-gray-600">رسالة جديدة</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-r-4 border-purple-500">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-gray-600">هذا الشهر</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.monthMessages}
          </div>
          <div className="text-sm text-gray-600">رسالة جديدة</div>
        </div>
      </div>
    </div>
  );
}
