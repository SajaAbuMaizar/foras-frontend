// file: app/page.tsx
'use client';
import { useEffect, useState } from "react";
import { fetchJobs, fetchEmployerLogos } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";
import Banner from "@/components/home/Banner";
import EmployerCarousel from "./components/CompanyLogoCarousel";
import JobCard from "@/components/JobCard";
import { MainPageJobListItem } from "@/types/MainPageJobListItem";
import { EmployerLogoUrlItem } from "@/types/EmployerLogoUrlItem";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [jobs, setJobs] = useState<MainPageJobListItem[]>([]);
  const [logos, setLogos] = useState<EmployerLogoUrlItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setPage(0);
    setJobs([]);
    loadJobs(0, params);
  }, [searchParams]);

  const loadJobs = async (pageToLoad: number, params: Record<string, string>) => {
    const response = await fetchJobs(pageToLoad, params);
    if (response.content.length > 0) {
      setJobs(prevJobs => [...prevJobs, ...response.content].filter(
        (job, index, self) => index === self.findIndex(j => j.id === job.id)
      ));
    }
    setHasMore(response.totalPages > pageToLoad + 1);
  };

  useEffect(() => {
    fetchEmployerLogos().then(setLogos);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        const params = Object.fromEntries(searchParams.entries());
        loadJobs(nextPage, params);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, searchParams]);

  return (
    <main className="min-h-screen">
      <Banner searchParams={Object.fromEntries(searchParams.entries())} />
      <EmployerCarousel logos={logos} />
      <div className="flex flex-wrap -mx-4 justify-center" dir="rtl">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {hasMore && <p>Loading more jobs...</p>}
    </main>
  );
}
