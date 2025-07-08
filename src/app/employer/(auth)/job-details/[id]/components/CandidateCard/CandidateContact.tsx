"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

interface CandidateContactProps {
  phone: string;
  candidateId: string;
}

export default function CandidateContact({
  phone,
  candidateId,
}: CandidateContactProps) {
  const router = useRouter();
  const t = useEmployerTranslations();

  const handleMessage = () => {
    router.push(`/employer/messages?candidateId=${candidateId}`);
  };

  return (
    <div className="flex items-center gap-3">
      <a
        href={`tel:${phone}`}
        className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
      >
        <Phone className="h-4 w-4" />
        <span className="font-medium">{phone}</span>
      </a>

      <button
        onClick={handleMessage}
        className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="font-medium">{t.jobApplications.actions.contact}</span>
      </button>
    </div>
  );
}
