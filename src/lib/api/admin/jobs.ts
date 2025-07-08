import { apiClient } from "@/lib/api-client";

export interface AdminJobRequest {
  jobTitle: string;
  jobDescription: string;
  language: string;
  cityId: number;
  jobType: string;
  industryId: number;
  salary: string;
  requiredQualifications: string;
  companyName: string;
  companyDescription?: string;
  companyPhone?: string;
  companyEmail?: string;
  transportation: boolean;
  hebrew: boolean;
  autoApprove: boolean;
  jobImage?: File;
  companyLogoFile: File;
}

export const adminJobsApi = {
  async createSeedJob(
    formData: FormData
  ): Promise<{ success: boolean; jobId?: number; message: string }> {
    try {
      return await apiClient.post("/api/admin/jobs/create-seed", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error creating seed job:", error);
      throw error;
    }
  },
};