"use client";

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const router = useRouter();
  const t = useEmployerTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-md">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {t.common.error}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>

        <div className="flex gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {t.common.retry}
            </button>
          )}
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
          >
            {t.common.goBack}
          </button>
        </div>
      </div>
    </div>
  );
}
