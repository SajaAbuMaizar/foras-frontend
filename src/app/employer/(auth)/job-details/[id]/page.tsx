// File: src/app/employer/(auth)/job-applications/[jobId]/page.tsx
"use client";

import { useState, useEffect, use } from "react";
import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import JobApplicationHeader from "./components/JobApplicationHeader";
import ApplicationsList from "./components/ApplicationsList";
import ApplicationFilters from "./components/ApplicationFilters";
import ApplicationStats from "./components/ApplicationStats";
import ApplicationDetails from "./components/ApplicationDetails";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getJobApplications, updateApplicationStatus } from "@/lib/api";
import { JobApplication } from "@/types/JobApplication";

type Props = {
  params: Promise<{ id: string }>;
};

export default function JobApplicationsPage({ params }: Props) {
  const { id } = use(params);
  const { lang } = useLanguage();
  const t = useEmployerTranslations();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    JobApplication[]
  >([]);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    dateRange: "all",
  });

  useEffect(() => {
    fetchApplications();
  }, [id]);

  useEffect(() => {
    filterApplications();
  }, [applications, filters]);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const data = await getJobApplications(id);
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((app) => app.status === filters.status);
    }

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (app) =>
          app.candidateName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          app.candidateEmail
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    // Date range filter
    if (filters.dateRange !== "all") {
      const now = new Date();
      const dateLimit = new Date();

      switch (filters.dateRange) {
        case "today":
          dateLimit.setHours(0, 0, 0, 0);
          break;
        case "week":
          dateLimit.setDate(now.getDate() - 7);
          break;
        case "month":
          dateLimit.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter((app) => new Date(app.appliedAt) >= dateLimit);
    }

    setFilteredApplications(filtered);
  };

  const handleStatusChange = async (
    applicationId: string,
    newStatus: "pending" | "accepted" | "rejected"
  ) => {
    try {
      // Update status via API
      await updateApplicationStatus(applicationId, newStatus);

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) {
    return (
      <LoadingSpinner visible={true} message={t.jobApplications.loading} />
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobApplicationHeader jobId={id} />

        <ApplicationStats applications={applications} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ApplicationFilters
              filters={filters}
              onFiltersChange={setFilters}
            />

            <ApplicationsList
              applications={filteredApplications}
              selectedApplication={selectedApplication}
              onSelectApplication={setSelectedApplication}
              onStatusChange={handleStatusChange}
            />
          </div>

          <div className="lg:col-span-1">
            {selectedApplication && (
              <ApplicationDetails
                application={selectedApplication}
                onStatusChange={handleStatusChange}
                onClose={() => setSelectedApplication(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
