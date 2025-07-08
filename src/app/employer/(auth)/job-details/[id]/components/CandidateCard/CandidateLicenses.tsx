"use client";

import { Car } from "lucide-react";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

interface CandidateLicensesProps {
  licenses: string[];
}

export default function CandidateLicenses({
  licenses,
}: CandidateLicensesProps) {
  const t = useEmployerTranslations();

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Car className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.filters.driverLicenses}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {licenses.map((license) => (
          <span
            key={license}
            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
          >
            {license}
          </span>
        ))}
      </div>
    </div>
  );
}
