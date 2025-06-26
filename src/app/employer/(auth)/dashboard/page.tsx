"use client";

import { useEffect, useState } from "react";
import LogoUploadAlert from "./components/LogoUploadAlert";
import JobListingsTable from "@/components/JobListingsTable";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/context/auth/AuthHooks";
import { isEmployer } from "@/context/auth/types";
import { JobListItem } from "@/types/jobs/JobListItem";
import { api } from "@/lib/axios";

const JobListingsPage = () => {
  const [lang, setLang] = useState<"ar" | "he">("ar");
  const { user } = useAuth();
  const [jobListings, setJobListings] = useState<JobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isUserEmployer = user && isEmployer(user);
  const [hasLogo, setHasLogo] = useState<boolean>(
    isUserEmployer ? !!user.companyLogoUrl : false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get<JobListItem[]>("/api/job/my-jobs");
        setJobListings(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        // You can add toast notifications here if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4 md:p-6">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {isUserEmployer && !hasLogo && (
          <LogoUploadAlert
            lang={lang}
            onLogoUploaded={() => setHasLogo(true)}
          />
        )}

        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6 text-right">
            {lang === "ar" ? "الوظائف المعلنة" : "המשרות המודעות"}
          </h1>

          <JobListingsTable
            role="employer"
            jobListings={jobListings}
            lang={lang}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;
