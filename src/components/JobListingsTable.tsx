'use client';

import React from 'react';
import JobStatusBadge from './JobStatusBadge';
import { JobListItem } from '@/types/jobs/JobListItem';
import { toast } from 'react-hot-toast';

type JobListingsTableProps = {
  jobListings: JobListItem[];
  lang: 'ar' | 'he';
  isLoading?: boolean;
  role: 'employer' | 'admin';
};

const JobListingsTable: React.FC<JobListingsTableProps> = ({
  jobListings,
  lang,
  isLoading = false,
  role,
}) => {
  const getJobDetailsUrl = (id: string) => {
    return role === 'admin'
      ? `/admin/job-details/${id}`
      : `/employer/job-details/${id}`;
  };

  const handleBoostDate = async (jobId: string) => {
    try {
      const res = await fetch(`/api/job/${jobId}/update-date`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Failed to update date');

      toast.success(lang === 'ar' ? 'تم تحديث التاريخ' : 'תאריך עודכן בהצלחה');
      window.location.reload(); // or router.refresh() if you use next/router
    } catch (err) {
      toast.error(lang === 'ar' ? 'فشل في التحديث' : 'עדכון נכשל');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'المسمى الوظيفي' : 'כותרת המשרה'}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'المكان' : 'המקום'}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'الوصف' : 'התיאור'}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'الراتب' : 'השכר'}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'معلومات اضافية' : 'מידע נוסף'}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'تحديث التاريخ' : 'הקפצת המשרה'}
              </th>
              <th className="px-6 py-3 text-right text-gray-500 font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'حالة الوظيفة' : 'סטטוס המשרה'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobListings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  {lang === 'ar' ? 'لا توجد وظائف مدرجة حتى الآن' : 'אין משרות מופיעות כרגע'}
                </td>
              </tr>
            ) : (
              jobListings.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={getJobDetailsUrl(job.id)}
                      className="text-violet-600 hover:text-violet-800 hover:underline"
                    >
                      {job.jobTitle}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lang === 'ar'
                      ? job.cityName.nameAr || job.cityName.nameHe
                      : job.cityName.nameHe}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    {job.jobDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.salary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={getJobDetailsUrl(job.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700"
                    >
                      {lang === 'ar' ? 'معلومات اضافية' : 'מידע נוסף'}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleBoostDate(job.id)}
                      disabled={isLoading}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50"
                    >
                      {lang === 'ar' ? 'تحديث التاريخ' : 'עדכן תאריך'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <JobStatusBadge status={job.status} lang={lang} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListingsTable;
