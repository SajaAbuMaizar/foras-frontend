import { Option } from "@/types/jobs/postJobTypes";
import { MainPageJobListItem } from "@/types/jobs/MainPageJobListItem";
import { EmployerJobDetailsItem } from "@/types/EmployerJobDetailsItem";
import { JobListItem } from "@/types/jobs/JobListItem";
import { EmployerLogoUrlItem } from "@/types/EmployerLogoUrlItem";
import { PaginatedResponseItem } from "@/types/PaginatedResponseItem";
import { apiClient } from "./api-client";
import { JobApplication } from "@/types/JobApplication";
import { JobApplicationResponse } from "@/types/JobApplicationResponse";
import { JobApplicationWithCandidate } from "@/types/JobApplicationWithCandidate";
import { mapJobApplicationToWithCandidate } from "@/utils/applicationMapper";

export async function fetchCities(): Promise<Option[]> {
  try {
    return await apiClient.withRetry(() =>
      apiClient.get<Option[]>("/api/cities")
    );
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

export async function fetchIndustries(): Promise<Option[]> {
  try {
    return await apiClient.withRetry(() =>
      apiClient.get<Option[]>("/api/industries")
    );
  } catch (error) {
    console.error("Error fetching industries:", error);
    return [];
  }
}

export async function fetchGenders(): Promise<Option[]> {
  try {
    return await apiClient.withRetry(() =>
      apiClient.get<Option[]>("/api/enums/genders")
    );
  } catch (error) {
    console.error("Error fetching genders:", error);
    return [];
  }
}

export async function fetchJobs(
  page = 0,
  searchParams?: Record<string, string>
): Promise<PaginatedResponseItem<MainPageJobListItem>> {
  try {
    const params = new URLSearchParams({
      ...searchParams,
      page: page.toString(),
      size: "9",
    }).toString();

    return await apiClient.withRetry(() =>
      apiClient.get<PaginatedResponseItem<MainPageJobListItem>>(
        `/api/job${
          searchParams && Object.keys(searchParams).length > 0 ? "/search" : ""
        }?${params}`
      )
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

export async function getJobDetailsForEmployer(
  id: string
): Promise<EmployerJobDetailsItem> {
  try {
    return await apiClient.withRetry(() =>
      apiClient.get<EmployerJobDetailsItem>(
        `/api/job/employer/job-details/${id}`
      )
    );
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error;
  }
}

export async function fetchEmployerLogos(): Promise<EmployerLogoUrlItem[]> {
  try {
    return await apiClient.withRetry(() =>
      apiClient.get<EmployerLogoUrlItem[]>(`/api/logos`)
    );
  } catch (error) {
    console.error("Error fetching employer logos:", error);
    throw error;
  }
}

export async function fetchListJobs(): Promise<JobListItem[]> {
  try {
    return await apiClient.withRetry(() =>
      apiClient.get<JobListItem[]>(`/api/job/admin/jobs`)
    );
  } catch (error) {
    console.error("Failed to fetch list jobs:", error);
    throw error;
  }
}

export async function getJobApplications(
  jobId: string
): Promise<JobApplicationResponse[]> {
  try {
    return await apiClient.withRetry(() =>
      apiClient.get<JobApplicationResponse[]>(
        `/api/job-applications/job/${jobId}/applications`
      )
    );
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  status: string
): Promise<void> {
  try {
    await apiClient.withRetry(() =>
      apiClient.patch(`/api/job-applications/${applicationId}/status`, {
        status,
      })
    );
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  }
}

// getCandidateProfile.ts
export async function getCandidateProfile() {
  return await apiClient.get("/api/candidate/me/profile");
}

// updateCandidateProfile.ts
export async function updateCandidateProfile(data: any) {
  return await apiClient.put("/api/candidate/me/profile", data);
}

// uploadCandidateAvatar.ts
export async function uploadCandidateAvatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  return await apiClient.post("/api/candidate/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
