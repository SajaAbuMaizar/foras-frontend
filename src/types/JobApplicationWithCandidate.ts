import { ApplicationStatus } from "./ApplicationStatus";

export interface JobApplicationWithCandidate {
  id: string;
  jobId: string;
  status: ApplicationStatus;
  appliedAt: string;
  candidate: {
    id: string;
    name: string;
    phone: string;
    area: string;
    gender: "MALE" | "FEMALE";
    knowsHebrew: boolean;
    needsHelp: boolean;
    skills: string[];
    languages: string[];
    driverLicenses: string[];
    avatarUrl?: string;
  };
}
