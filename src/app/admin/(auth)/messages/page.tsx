"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Archive,
  AlertCircle,
} from "lucide-react";
import MessagesList from "./components/MessagesList";
import MessageDetails from "./components/MessageDetails";
import MessagesStats from "./components/MessagesStats";
import { ContactMessage, ContactMessageStatus } from "@/types/admin/contact";
import { toast } from "react-hot-toast";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactMessageStatus | "">(
    ""
  );
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [stats, setStats] = useState<any>(null);

  const fetchMessages = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: "20",
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/contact-messages?${params}`, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      setMessages(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("حدث خطأ في تحميل الرسائل");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/contact-messages/stats", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch stats");

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [page, searchQuery, statusFilter]);

  const handleMessageSelect = async (message: ContactMessage) => {
    setSelectedMessage(message);

    // Mark as read if not already
    if (!message.read) {
      try {
        const response = await fetch(
          `/api/admin/contact-messages/${message.id}/read`,
          {
            method: "PATCH",
            credentials: "include",
          }
        );

        if (response.ok) {
          // Update local state
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === message.id ? { ...msg, read: true } : msg
            )
          );
          fetchStats(); // Refresh stats
        }
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    }
  };

  const handleStatusUpdate = async (
    messageId: number,
    status: ContactMessageStatus,
    notes?: string
  ) => {
    try {
      const response = await fetch(
        `/api/admin/contact-messages/${messageId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status,
            adminNotes: notes,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      const updatedMessage = await response.json();

      // Update local state
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? updatedMessage : msg))
      );

      if (selectedMessage?.id === messageId) {
        setSelectedMessage(updatedMessage);
      }

      toast.success("تم تحديث حالة الرسالة بنجاح");
      fetchStats(); // Refresh stats
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error("حدث خطأ في تحديث حالة الرسالة");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status as ContactMessageStatus) {
      case "NEW":
        return <AlertCircle className="h-4 w-4" />;
      case "IN_PROGRESS":
        return <Clock className="h-4 w-4" />;
      case "DONE":
        return <CheckCircle className="h-4 w-4" />;
      case "ARCHIVED":
        return <Archive className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status as ContactMessageStatus) {
      case "NEW":
        return "text-blue-600 bg-blue-50";
      case "IN_PROGRESS":
        return "text-yellow-600 bg-yellow-50";
      case "DONE":
        return "text-green-600 bg-green-50";
      case "ARCHIVED":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            إدارة الرسائل
          </h1>
          <p className="text-gray-600 mt-1">إدارة رسائل التواصل من الزوار</p>
        </div>
      </div>

      {/* Stats */}
      {stats && <MessagesStats stats={stats} />}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الرسائل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as ContactMessageStatus | "")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">جميع الحالات</option>
              <option value="NEW">جديد</option>
              <option value="IN_PROGRESS">قيد المعالجة</option>
              <option value="DONE">مكتمل</option>
              <option value="ARCHIVED">مؤرشف</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <MessagesList
            messages={messages}
            selectedMessage={selectedMessage}
            onMessageSelect={handleMessageSelect}
            isLoading={isLoading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
          />
        </div>

        {/* Message Details */}
        <div className="lg:col-span-1">
          {selectedMessage ? (
            <MessageDetails
              message={selectedMessage}
              onStatusUpdate={handleStatusUpdate}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">اختر رسالة لعرض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
