"use client";

import { ContactMessage } from "@/types/admin/contact";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Mail, MailOpen } from "lucide-react";

interface MessagesListProps {
  messages: ContactMessage[];
  selectedMessage: ContactMessage | null;
  onMessageSelect: (message: ContactMessage) => void;
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
}

export default function MessagesList({
  messages,
  selectedMessage,
  onMessageSelect,
  isLoading,
  page,
  totalPages,
  onPageChange,
  getStatusIcon,
  getStatusColor,
}: MessagesListProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">لا توجد رسائل</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="divide-y divide-gray-200">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => onMessageSelect(message)}
            className={`p-4 cursor-pointer transition-colors ${
              selectedMessage?.id === message.id
                ? "bg-blue-50 border-r-4 border-blue-500"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {message.read ? (
                    <MailOpen className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Mail className="h-4 w-4 text-blue-600" />
                  )}
                  <h3
                    className={`text-sm font-semibold truncate ${
                      !message.read ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    {message.fullName}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(
                      message.status
                    )}`}
                  >
                    {getStatusIcon(message.status)}
                    <span>
                      {message.status === "NEW" && "جديد"}
                      {message.status === "IN_PROGRESS" && "قيد المعالجة"}
                      {message.status === "DONE" && "مكتمل"}
                      {message.status === "ARCHIVED" && "مؤرشف"}
                    </span>
                  </span>
                </div>
                <p className="text-sm text-gray-900 font-medium mb-1">
                  {message.subject}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {message.message}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>{message.phoneNumber}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(message.createdAt), {
                      addSuffix: true,
                      locale: ar,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0}
              className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
              السابق
            </button>
            <span className="text-sm text-gray-700">
              صفحة {page + 1} من {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages - 1}
              className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              التالي
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
