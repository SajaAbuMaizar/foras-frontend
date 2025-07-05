import { apiClient } from "../api-client";
import { JobApplication } from "@/types/JobApplication";

export const getJobApplications = async (
  jobId: string
): Promise<JobApplication[]> => {
  try {
    const response = await apiClient.get<JobApplication[]>(
      `/api/job/${jobId}/applications`
    );
    return response;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: string
): Promise<void> => {
  try {
    await apiClient.patch(`/api/job-application/${applicationId}/status`, {
      status,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  }
};
