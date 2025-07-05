"use client";

import { Candidate } from "@/types/candidate";
import { Phone, User } from "lucide-react";

interface ApplicantCardProps {
  candidate: Candidate;
}

export default function ApplicantCard({ candidate }: ApplicantCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
          <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
        </div>
        <h4 className="font-medium text-gray-900 dark:text-white">
          {candidate.name}
        </h4>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <Phone className="h-4 w-4" />
        <a
          href={`tel:${candidate.phone}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {candidate.phone}
        </a>
      </div>
    </div>
  );
}
