"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { fetchJobs, fetchEmployerLogos } from "@/lib/api";
import Banner from "@/components/home/Banner";
import EmployerCarousel from "./components/CompanyLogoCarousel";
import JobCard from "@/components/JobCard";
import SignInModal from "@/components/modals/CandidateSignInModal";
import { MainPageJobListItem } from "@/types/jobs/MainPageJobListItem";
import { EmployerLogoUrlItem } from "@/types/EmployerLogoUrlItem";
import { JobCardSkeleton } from "@/components/ui/Skeleton";

export default function Home() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<MainPageJobListItem[]>([]);
  const [logos, setLogos] = useState<EmployerLogoUrlItem[]>([]);
  const [logosLoading, setLogosLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const searchParamsObj = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const loadJobs = useCallback(
    async (pageToLoad: number, params: Record<string, string>) => {
      setIsLoading(true);
      try {
        const response = await fetchJobs(pageToLoad, params);
        if (response.content.length > 0) {
          setJobs((prevJobs) => [
            ...prevJobs,
            ...response.content.filter(
              (job: { id: number }) =>
                prevJobs.findIndex((j) => j.id === job.id) === -1
            ),
          ]);
        }
        setHasMore(response.totalPages > pageToLoad + 1);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    },
    []
  );

  useEffect(() => {
    setPage(0);
    setJobs([]);
    setIsInitialLoad(true);
    loadJobs(0, searchParamsObj);
  }, [searchParamsObj, loadJobs]);

  useEffect(() => {
    fetchEmployerLogos()
      .then(setLogos)
      .finally(() => setLogosLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasMore &&
        !isLoading
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadJobs(nextPage, searchParamsObj);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, isLoading, loadJobs, searchParamsObj]);

  const handleLoginRequired = () => {
    setShowSignInModal(true);
  };

  const handleCloseSignInModal = () => {
    setShowSignInModal(false);
  };

  return (
    <main className="min-h-screen">
      <Banner searchParams={searchParamsObj} />
      <EmployerCarousel logos={logos} isLoading={logosLoading} />
      <div className="flex flex-wrap justify-center gap-4 px-4 py-8">
        {isInitialLoad && isLoading
          ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
          : jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onLoginRequired={handleLoginRequired}
              />
            ))}
      </div>
      {isLoading && hasMore && !isInitialLoad && (
        <div className="text-center text-gray-500 py-4">
          جاري تحميل وظائف إضافية...
        </div>
      )}

      <SignInModal isOpen={showSignInModal} onClose={handleCloseSignInModal} />
    </main>
  );
}
