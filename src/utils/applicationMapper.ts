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
      gender: "MALE", // Default since backend doesn't provide this
      knowsHebrew: false, // Default since backend doesn't provide this
      needsHelp: false, // Default since backend doesn't provide this
      skills: application.skills || [],
      languages: application.languages || [],
      driverLicenses: [], // Backend doesn't provide this
      avatarUrl: application.candidateAvatar,
    },
  };
}
