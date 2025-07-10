import { JobApplicationResponse } from "@/types/JobApplicationResponse";
import { JobApplicationWithCandidate } from "@/types/JobApplicationWithCandidate";

export function mapJobApplicationToWithCandidate(
  application: JobApplicationResponse
): JobApplicationWithCandidate {
  return {
    id: application.id,
    jobId: application.jobId,
    status: application.status,
    appliedAt: application.appliedAt,
    candidate: {
      id: application.candidateId,
      name: application.candidateName,
      phone: application.candidatePhone,
      area: application.candidateLocation || "Unknown",
      gender: application.candidateGender,
      skills: application.skills || [],
      languages: application.languages || [],
      driverLicenses: [], // Backend doesn't provide this
      avatarUrl: application.candidateAvatar,
    },
  };
}

// Enhanced mapper with additional data fetching capability
export async function fetchEnhancedCandidateData(
  candidateId: string
): Promise<any> {
  // This would fetch additional candidate data from the API
  // For now, returning null as the endpoint might not exist yet
  return null;
}