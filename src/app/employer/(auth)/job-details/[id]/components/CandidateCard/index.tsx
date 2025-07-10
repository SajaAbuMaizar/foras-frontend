"use client";

import { JobApplicationWithCandidate } from "@/types/JobApplicationWithCandidate";
import CandidateHeader from "./CandidateHeader";
import CandidateContact from "./CandidateContact";
import CandidateSkills from "./CandidateSkills";
import CandidateLanguages from "./CandidateLanguages";
import CandidateLicenses from "./CandidateLicenses";
import CandidateStatus from "./CandidateStatus";
import CandidateActions from "./CandidateActions";

interface CandidateCardProps {
  application: JobApplicationWithCandidate;
  onStatusChange?: (applicationId: string, status: string) => void;
}

export default function CandidateCard({
  application,
  onStatusChange,
}: CandidateCardProps) {
  const { candidate } = application;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <CandidateHeader
        name={candidate.name}
        area={candidate.area}
        gender={candidate.gender}
        avatarUrl={candidate.avatarUrl}
        appliedAt={application.appliedAt}
      />

      <div className="mt-4 space-y-4">
        <CandidateContact phone={candidate.phone} candidateId={candidate.id} />

        <CandidateStatus
          status={application.status}
        />

        {candidate.skills.length > 0 && (
          <CandidateSkills skills={candidate.skills} />
        )}

        {candidate.languages.length > 0 && (
          <CandidateLanguages languages={candidate.languages} />
        )}

        {candidate.driverLicenses.length > 0 && (
          <CandidateLicenses licenses={candidate.driverLicenses} />
        )}

        <CandidateActions
          applicationId={application.id}
          status={application.status}
          onStatusChange={onStatusChange}
        />
      </div>
    </div>
  );
}
