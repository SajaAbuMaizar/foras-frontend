'use client';

import JobListingsTable from '@/components/JobListingsTable';

type Job = {
  id: string;
  jobTitle: string;
  cityName: {
    nameAr: string;
    nameHe: string;
  };
  jobDescription: string;
  salary: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job/admin/jobs`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export default async function AdminJobsPage() {
  const jobs = await getJobs();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-right">משרות</h1>
      <JobListingsTable
        jobListings={jobs}
        lang="he"
        role="admin"
      />
    </div>
  );
}
