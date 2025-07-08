"use client";

import { User, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/context/language/LanguageContext";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ar, he } from "date-fns/locale";

interface CandidateHeaderProps {
  name: string;
  area: string;
  gender: "MALE" | "FEMALE";
  avatarUrl?: string;
  appliedAt: string;
}

export default function CandidateHeader({
  name,
  area,
  gender,
  avatarUrl,
  appliedAt,
}: CandidateHeaderProps) {
  const { lang } = useLanguage();
  const locale = lang === "ar" ? ar : he;

  const timeAgo = formatDistanceToNow(new Date(appliedAt), {
    addSuffix: true,
    locale,
  });

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          ) : (
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                gender === "MALE"
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-pink-100 dark:bg-pink-900"
              }`}
            >
              <User
                className={`h-6 w-6 ${
                  gender === "MALE"
                    ? "text-blue-600 dark:text-blue-300"
                    : "text-pink-600 dark:text-pink-300"
                }`}
              />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{area}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
