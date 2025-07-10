export interface JobApplicationResponse {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail?: string;
  candidateGender: "MALE" | "FEMALE";
  candidatePhone: string;
  candidateAvatar?: string;
  candidateLocation?: string;
  skills?: string[];
  coverLetter?: string;
  resumeUrl?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt: string;
  experience?: string;
  education?: string;
  languages?: string[];
}
