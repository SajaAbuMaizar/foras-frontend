"use client";

import { useState } from "react";
import { ContactMessage, ContactMessageStatus } from "@/types/admin/contact";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { User, Phone, Calendar, Clock, Edit2, Save, X } from "lucide-react";

interface MessageDetailsProps {
  message: ContactMessage;
  onStatusUpdate: (
    messageId: number,
    status: ContactMessageStatus,
    notes?: string
  ) => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
}

export default function MessageDetails({
  message,
  onStatusUpdate,
  getStatusIcon,
  getStatusColor,
}: MessageDetailsProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(message.adminNotes || "");
  const [selectedStatus, setSelectedStatus] = useState(message.status);

  const handleSaveNotes = () => {
    onStatusUpdate(message.id, selectedStatus, notes);
    setIsEditingNotes(false);
  };

  const handleStatusChange = (newStatus: ContactMessageStatus) => {
    setSelectedStatus(newStatus);
    onStatusUpdate(message.id, newStatus, notes);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">تفاصيل الرسالة</h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Sender Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">الاسم:</span>
            <span className="font-medium text-gray-900">
              {message.fullName}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">الهاتف:</span>
            <a
              href={`tel:${message.phoneNumber}`}
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              {message.phoneNumber}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">التاريخ:</span>
            <span className="font-medium text-gray-900">
              {format(new Date(message.createdAt), "dd MMMM yyyy - hh:mm a", {
                locale: ar,
              })}
            </span>
          </div>
        </div>

        {/* Subject */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-1">الموضوع</h3>
          <p className="text-gray-900">{message.subject}</p>
        </div>

        {/* Message */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">الرسالة</h3>
          <p className="text-gray-900 whitespace-pre-wrap">{message.message}</p>
        </div>

        {/* Status */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">الحالة</h3>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                "NEW",
                "IN_PROGRESS",
                "DONE",
                "ARCHIVED",
              ] as ContactMessageStatus[]
            ).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? getStatusColor(status)
                    : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {getStatusIcon(status)}
                <span>
                  {status === "NEW" && "جديد"}
                  {status === "IN_PROGRESS" && "قيد المعالجة"}
                  {status === "DONE" && "مكتمل"}
                  {status === "ARCHIVED" && "مؤرشف"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Admin Notes */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              ملاحظات الإدارة
            </h3>
            {!isEditingNotes && (
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            )}
          </div>

          {isEditingNotes ? (
            <div className="space-y-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="أضف ملاحظاتك هنا..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  <Save className="h-4 w-4" />
                  حفظ
                </button>
                <button
                  onClick={() => {
                    setIsEditingNotes(false);
                    setNotes(message.adminNotes || "");
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                >
                  <X className="h-4 w-4" />
                  إلغاء
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-900 whitespace-pre-wrap">
              {message.adminNotes || "لا توجد ملاحظات"}
            </p>
          )}
        </div>

        {/* Handler Info */}
        {message.handledBy && message.handledAt && (
          <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>تمت المعالجة بواسطة المسؤول #{message.handledBy}</span>
            </div>
            <div className="mr-5">
              {format(new Date(message.handledAt), "dd MMMM yyyy - hh:mm a", {
                locale: ar,
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
