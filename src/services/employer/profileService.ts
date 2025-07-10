import { apiClient } from "@/lib/api-client";
import {
  EmployerProfile,
  UpdateEmployerProfileRequest,
} from "@/types/employer/profile";

export const employerProfileService = {
  getProfile: async (): Promise<EmployerProfile> => {
    return await apiClient.get<EmployerProfile>("/api/employer/profile");
  },

  updateProfile: async (
    data: UpdateEmployerProfileRequest
  ): Promise<EmployerProfile> => {
    return await apiClient.put<EmployerProfile, UpdateEmployerProfileRequest>(
      "/api/employer/profile",
      data
    );
  },

  uploadLogo: async (
    file: File
  ): Promise<{ message: string; logoUrl: string }> => {
    const formData = new FormData();
    formData.append("logo", file);

    return await apiClient.post<{ message: string; logoUrl: string }>(
      "/api/employer/profile/logo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  deleteLogo: async (): Promise<{ message: string }> => {
    return await apiClient.delete<{ message: string }>(
      "/api/employer/profile/logo"
    );
  },
};
