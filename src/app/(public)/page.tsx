'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchJobs, fetchEmployerLogos } from '@/lib/api';
import Banner from '@/components/home/Banner';
import EmployerCarousel from './components/CompanyLogoCarousel';
import JobCard from '@/components/JobCard';
import { MainPageJobListItem } from '@/types/MainPageJobListItem';
import { EmployerLogoUrlItem } from '@/types/EmployerLogoUrlItem';

export default function Home() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<MainPageJobListItem[]>([]);
  const [logos, setLogos] = useState<EmployerLogoUrlItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
          setJobs(prevJobs => [
            ...prevJobs,
            ...response.content.filter((job: { id: number; }) =>
              prevJobs.findIndex(j => j.id === job.id) === -1
            ),
          ]);
        }
        setHasMore(response.totalPages > pageToLoad + 1);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setPage(0);
    setJobs([]);
    loadJobs(0, searchParamsObj);
  }, [searchParamsObj, loadJobs]);

  useEffect(() => {
    fetchEmployerLogos().then(setLogos);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore &&
        !isLoading
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadJobs(nextPage, searchParamsObj);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, hasMore, isLoading, loadJobs, searchParamsObj]);

  return (
    <main className="min-h-screen">
      <Banner searchParams={searchParamsObj} />
      <EmployerCarousel logos={logos} />
      <div className="flex flex-wrap justify-center gap-4 px-4 py-8" dir="rtl">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {isLoading && hasMore && (
        <div className="text-center text-gray-500 py-4">جاري تحميل وظائف إضافية...</div>
      )}
    </main>
  );
}
