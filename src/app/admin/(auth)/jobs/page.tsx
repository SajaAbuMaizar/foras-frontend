'use client';

import useSWR from 'swr';
import axios from 'axios';
import JobListingsTable from '@/components/JobListingsTable';
import { JobListItem } from '@/types/jobs/JobListItem';

// Define a typed fetcher that returns a promise of JobListItem[]
const fetcher = (url: string): Promise<JobListItem[]> =>
  Promise.resolve(axios.get(url, { withCredentials: true })).then(res => res.data as JobListItem[]);

export default function AdminJobsPage() {
  const {
    data: jobs,
    error,
    isLoading,
  } = useSWR<JobListItem[]>('/api/job/admin/jobs', fetcher);

  if (isLoading) return <div className="text-center mt-8">טוען משרות...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">שגיאה בטעינת המשרות</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-right">משרות</h1>
      <JobListingsTable jobListings={jobs ?? []} lang="he" role="admin" />
    </div>
  );
}
