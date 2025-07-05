export interface DashboardStats {
  // Candidates
  totalCandidates: number;
  candidatesChange: number;
  candidatesKnowHebrew: number;
  candidatesNoHebrew: number;
  candidatesMale: number;
  candidatesFemale: number;
  candidatesWithSkills: number;
  candidatesNeedHelp: number;

  // Employers
  totalEmployers: number;
  employersChange: number;
  activeEmployers: number;
  inactiveEmployers: number;
  topEmployerCities: CityCount[];
  avgJobsPerEmployer: number;

  // Jobs
  totalJobs: number;
  jobsChange: number;
  approvedJobs: number;
  pendingJobs: number;
  rejectedJobs: number;

  // Messages
  totalMessages: number;
  messagesChange: number;
  newMessages: number;
  sentMessages: number;
  archivedMessages: number;
  deletedMessages: number;
  messageResponseRate: number;

  // Activity
  activeUsers: number;
  lastUpdated: string;
}

export interface CityCount {
  name: string;
  count: number;
}

export interface ActivityItem {
  id: string;
  type:
    | "new_candidate"
    | "new_employer"
    | "new_job"
    | "new_message"
    | "job_approved"
    | "job_rejected";
  description: string;
  createdAt: string;
  userId?: string;
  userName?: string;
}
