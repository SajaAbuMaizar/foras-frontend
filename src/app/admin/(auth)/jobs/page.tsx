import { fetchListJobs } from '@/lib/api';
import JobListingsTable from '@/components/JobListingsTable';

export default async function AdminJobsPage() {
  const jobs = await fetchListJobs();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-right">משרות</h1>
      <JobListingsTable jobListings={jobs} lang="he" role="admin" />
    </div>
  );
}
