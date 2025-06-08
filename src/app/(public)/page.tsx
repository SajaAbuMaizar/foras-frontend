'use client'

import Banner from '../../components/home/Banner';
import EmployerCarousel from '@/app/(public)/components/CompanyLogoCarousel';
import JobCard from '@/components/JobCard'
import { fetchJobs } from '@/lib/api';

const jobs = await fetchJobs();


export default function Home() {

  return (
    <main className="min-h-screen">
      <Banner / >
      < EmployerCarousel logos={[]} />
      <div className="flex flex-wrap -mx-4 justify-center" dir='rtl'>
        {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
      </div>
    </main>
  );
}