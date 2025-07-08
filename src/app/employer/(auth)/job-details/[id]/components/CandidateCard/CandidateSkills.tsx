"use client";

import { Wrench } from "lucide-react";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { getSkillTranslation } from "@/utils/skillTranslations";
import { useLanguage } from "@/context/language/LanguageContext";

interface CandidateSkillsProps {
  skills: string[];
}

export default function CandidateSkills({ skills }: CandidateSkillsProps) {
  const t = useEmployerTranslations();
  const { lang } = useLanguage();

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Wrench className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.jobApplications.skills}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
          >
            {getSkillTranslation(skill, lang)}
          </span>
        ))}
      </div>
    </div>
  );
}
