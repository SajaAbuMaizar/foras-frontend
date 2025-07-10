"use client";

import { EmployerJobDetailsItem } from "@/types/EmployerJobDetailsItem";
import JobInfoSection from "./JobInfoSection";
import { JobDetailsModalSkeleton } from "@/components/ui/skeletons";
import { useState, useEffect } from "react";

interface JobDetailsCardProps {
  job: EmployerJobDetailsItem;
  isLoading?: boolean;
}

export default function JobDetailsCard({
  job,
  isLoading = false,
}: JobDetailsCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (job?.imageUrl) {
      const img = new Image();
      img.src = job.imageUrl;
      img.onload = () => setImageLoaded(true);
    }
  }, [job?.imageUrl]);

  if (isLoading || !imageLoaded) {
    return <JobDetailsModalSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Job Image */}
          <div className="lg:col-span-1">
            <img
              src={job.imageUrl}
              alt={job.jobTitle}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Job Information */}
          <div className="lg:col-span-2">
            <JobInfoSection job={job} />
          </div>
        </div>
      </div>
    </div>
  );
}
