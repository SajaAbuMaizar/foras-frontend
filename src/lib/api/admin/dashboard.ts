import { apiClient } from "@/lib/api-client";
import { DashboardStats, ActivityItem } from "@/types/admin/dashboard";
import { JobListItem } from "@/types/jobs/JobListItem";

export const adminDashboardApi = {
  // Fetch dashboard statistics
  async getStats(): Promise<DashboardStats> {
    try {
      return await apiClient.withRetry(() =>
        apiClient.get<DashboardStats>("/api/admin/dashboard/stats")
      );
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // Fetch recent activities
  async getActivities(limit: number = 10): Promise<ActivityItem[]> {
    try {
      return await apiClient.withRetry(() =>
        apiClient.get<ActivityItem[]>(
          `/api/admin/dashboard/activities?limit=${limit}`
        )
      );
    } catch (error) {
      console.error("Error fetching activities:", error);
      throw error;
    }
  },

  // Fetch recent jobs
  async getRecentJobs(limit: number = 5): Promise<JobListItem[]> {
    try {
      return await apiClient.withRetry(() =>
        apiClient.get<JobListItem[]>(`/api/admin/jobs/recent?limit=${limit}`)
      );
    } catch (error) {
      console.error("Error fetching recent jobs:", error);
      throw error;
    }
  },

  // Export dashboard data
  async exportData(format: "csv" | "xlsx" = "csv"): Promise<Blob> {
    try {
      const response = await apiClient.get(
        `/api/admin/dashboard/export?format=${format}`,
        {
          responseType: "blob",
        }
      );
      return response as Blob;
    } catch (error) {
      console.error("Error exporting dashboard data:", error);
      throw error;
    }
  },
};
