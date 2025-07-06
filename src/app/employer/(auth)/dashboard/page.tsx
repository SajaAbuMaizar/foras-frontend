"use client";

import { useEffect, useState } from "react";
import LogoUploadAlert from "./components/LogoUploadAlert";
import JobListingsTable from "@/components/JobListingsTable";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/context/auth/AuthHooks";
import { isEmployer } from "@/context/auth/types";
import { JobListItem } from "@/types/jobs/JobListItem";
import { apiClient } from "@/lib/api-client";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

const JobListingsPage = () => {
  const t = useEmployerTranslations().jobListingsPage;
  const { user } = useAuth();
  const [jobListings, setJobListings] = useState<JobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isUserEmployer = user && isEmployer(user);
  const [hasLogo, setHasLogo] = useState<boolean>(
    isUserEmployer ? !!user.companyLogoUrl : false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.withRetry(() =>
          apiClient.get<JobListItem[]>("/api/job/my-jobs")
        );
        setJobListings(data);
      } catch {
        // Error is handled by api-client
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 rtl:pr-64" dir="rtl">
      <div className="flex-grow p-4 md:p-6">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {isUserEmployer && !hasLogo && (
          <LogoUploadAlert onLogoUploaded={() => setHasLogo(true)} />
        )}

        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6 text-right">{t.heading}</h1>

          <JobListingsTable
            role="employer"
            jobListings={jobListings}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;
