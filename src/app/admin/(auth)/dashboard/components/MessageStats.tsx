"use client";

import { DashboardStats } from "@/types/admin/dashboard";
import { MessageSquare, Send, Archive, Trash2 } from "lucide-react";

interface MessageStatsProps {
  stats: DashboardStats | null;
}

export default function MessageStats({ stats }: MessageStatsProps) {
  const messageData = [
    {
      label: "رسائل جديدة",
      value: stats?.newMessages || 0,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "مرسلة",
      value: stats?.sentMessages || 0,
      icon: Send,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "مؤرشفة",
      value: stats?.archivedMessages || 0,
      icon: Archive,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      label: "محذوفة",
      value: stats?.deletedMessages || 0,
      icon: Trash2,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          إحصائيات الرسائل
        </h2>
      </div>

      <div className="space-y-4">
        {messageData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </div>
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Total Messages */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">
            {stats?.totalMessages || 0}
          </p>
          <p className="text-sm text-gray-600 mt-1">إجمالي الرسائل</p>
        </div>
      </div>

      {/* Response Rate */}
      {stats?.messageResponseRate !== undefined && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">معدل الاستجابة</span>
            <span className="text-lg font-semibold text-gray-900">
              {stats.messageResponseRate.toFixed(1)}%
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${stats.messageResponseRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
