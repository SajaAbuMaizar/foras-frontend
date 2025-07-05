export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateAvatar?: string;
  candidateLocation?: string;
  skills?: string[];
  coverLetter?: string;
  resumeUrl?: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
  experience?: string;
  education?: string;
  languages?: string[];
}
