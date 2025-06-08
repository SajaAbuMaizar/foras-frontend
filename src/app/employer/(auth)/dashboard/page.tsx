// pages/job-listings.tsx
'use client';

import { useEffect, useState } from 'react';
import LogoUploadAlert from './components/LogoUploadAlert';
import JobListingsTable from './components/JobListingsTable';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type JobListing = {
  id: string;
  jobTitle: string;
  cityName: {
    nameAr: string;
    nameHe: string;
  };
  jobDescription: string;
  salary: string;
  // status: 'PENDING' | 'APPROVED' | 'REJECTED';
  //updatedAt: string;
};

type Employer = {
  id: string;
  companyLogoUrl: string | null;
};

const JobListingsPage = () => {
  const [lang, setLang] = useState<'ar' | 'he'>('ar');
  const [employer] = useState<Employer>({
    id: '123',
    companyLogoUrl: null,
  });
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch employer data and job listings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const jobsRes = await fetch('/api/job/my-jobs');
        if (!jobsRes.ok) throw new Error('Failed to fetch job listings');
        const jobsData = await jobsRes.json();
        setJobListings(jobsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  const changeLanguage = (newLang: 'ar' | 'he') => {
    setLang(newLang);
    // Here you would typically make an API call to update the language preference
  };

  const updateAllRecentDates = async (employerId: string) => {
    try {
      setIsLoading(true);
      // API call to update all job dates
      // await updateAllJobDates(employerId);
      alert(lang === 'ar' ? 'تم تحديث جميع التواريخ بنجاح' : 'כל התאריכים עודכנו בהצלחה');
    } catch (error) {
      console.error('Error updating dates:', error);
      alert(lang === 'ar' ? 'حدث خطأ أثناء التحديث' : 'אירעה שגיאה בעת העדכון');
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecentDate = async (jobId: string) => {
    try {
      setIsLoading(true);
      // API call to update single job date
      // await updateJobDate(jobId);
      alert(lang === 'ar' ? 'تم تحديث التاريخ بنجاح' : 'התאריך עודכן בהצלחה');
    } catch (error) {
      console.error('Error updating date:', error);
      alert(lang === 'ar' ? 'حدث خطأ أثناء التحديث' : 'אירעה שגיאה בעת העדכון');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4 md:p-6">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {!employer.companyLogoUrl && (
          <LogoUploadAlert lang={lang} />
        )}

        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6 text-right">
            {lang === 'ar' ? 'الوظائف المعلنة' : 'המשרות המודעות'}
          </h1>

          <div className="text-left mb-6">
            <button
              onClick={() => updateAllRecentDates(employer.id)}
              disabled={isLoading}
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {lang === 'ar' ? 'تحديث تاريخ جميع الوظائف' : 'הקפצת כל המשרות'}
            </button>
          </div>

          <JobListingsTable
            jobListings={jobListings}
            lang={lang}
            isLoading={isLoading}
            onUpdateDate={updateRecentDate}
          />
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;