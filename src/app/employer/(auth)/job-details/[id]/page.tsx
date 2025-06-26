// pages/job/[id]/page.tsx
'use client';
import JobDetails from './components/JobDetails';
import { getJobDetailsForEmployer } from '@/lib/api';
import { useEffect, useState } from 'react';
import { use } from 'react';
import { EmployerJobDetailsItem } from '@/types/EmployerJobDetailsItem';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export default function JobPage({ params, searchParams }: Props) {
  const { id } = use(params);
  const { lang } = use(searchParams);
  
  const [jobDetails, setJobDetails] = useState<EmployerJobDetailsItem | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getJobDetailsForEmployer(id)
      .then(data => {
        setJobDetails(data);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setJobDetails(null);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching job details:', error);
    return <div>Failed to load job details</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 rtl:pr-64" dir="rtl">
      <main className="max-w-7xl mx-auto">
        <JobDetails 
          job={jobDetails!} // fixme
          lang={'ar'} // Fallback to 'ar' if lang is undefined
        /> 
      </main>
    </div>
  );
}