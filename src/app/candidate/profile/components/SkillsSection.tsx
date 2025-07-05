import React from "react";
import { Skill, SKILLS } from "@/types/CandidateDetails";
import { Award } from "lucide-react";

interface Props {
  skills: Skill[];
  onToggle: (skill: Skill) => void;
}

const skillLabels: Record<Skill, string> = {
  cook: "طبخ",
  hotel: "فندقة",
  technology: "تكنولوجيا",
  management: "إدارة",
  construction: "بناء",
  customers: "خدمة عملاء",
  sales: "مبيعات",
  order: "تحضير طلبات",
  saver: "منقذ سباحة",
  barman: "بارمان",
  barista: "باريستا",
  electricity: "كهرباء",
  condition: "مكيّفات",
  cars: "سيارات",
};

const skillIcons: Record<Skill, string> = {
  cook: "👨‍🍳",
  hotel: "🏨",
  technology: "💻",
  management: "📊",
  construction: "🏗️",
  customers: "🤝",
  sales: "💰",
  order: "📦",
  saver: "🏊",
  barman: "🍸",
  barista: "☕",
  electricity: "⚡",
  condition: "❄️",
  cars: "🚗",
};

export const SkillsSection: React.FC<Props> = ({ skills, onToggle }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Award size={24} className="text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">المهارات</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {SKILLS.map((skill) => (
          <label
            key={skill}
            className={`
              relative flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer
              transition-all duration-200 hover:scale-105
              ${
                skills.includes(skill)
                  ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }
            `}
          >
            <input
              type="checkbox"
              checked={skills.includes(skill)}
              onChange={() => onToggle(skill)}
              className="sr-only"
            />
            <span className="text-xl">{skillIcons[skill]}</span>
            <span
              className={`font-medium ${
                skills.includes(skill) ? "text-blue-700" : "text-gray-700"
              }`}
            >
              {skillLabels[skill]}
            </span>
            {skills.includes(skill) && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};
