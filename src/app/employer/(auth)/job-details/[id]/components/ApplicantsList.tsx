"use client";

import { Candidate } from "@/types/candidate";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { Users } from "lucide-react";
import ApplicantCard from "./ApplicantCard";

interface ApplicantsListProps {
  candidates: Candidate[];
}

export default function ApplicantsList({ candidates }: ApplicantsListProps) {
  const t = useEmployerTranslations();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="h-6 w-6" />
          {t.jobDetails.applicants}
        </h3>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
          {candidates.length} {t.jobDetails.totalApplicants}
        </span>
      </div>

      {candidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((candidate) => (
            <ApplicantCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {t.jobDetails.noApplicantsYet}
          </p>
        </div>
      )}
    </div>
  );
}
