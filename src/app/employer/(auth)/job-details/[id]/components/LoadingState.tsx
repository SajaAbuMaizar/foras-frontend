"use client";

import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Loading job details...
        </p>
      </div>
    </div>
  );
}
