// components/JobListingsTable.tsx
import React from 'react';
import JobStatusBadge from './JobStatusBadge';

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

type JobListingsTableProps = {
  jobListings: JobListing[];
  lang: 'ar' | 'he';
  isLoading: boolean;
  onUpdateDate: (jobId: string) => void;
};

const JobListingsTable: React.FC<JobListingsTableProps> = ({
  jobListings,
  lang,
  isLoading,
  onUpdateDate,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                {lang === 'ar' ? 'المسمى الوظيفي' : 'כותרת המשרה'}
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                {lang === 'ar' ? 'المكان' : 'המקום'}
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                {lang === 'ar' ? 'الوصف' : 'התיאור'}
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                {lang === 'ar' ? 'الراتب' : 'השכר'}
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                {lang === 'ar' ? 'معلومات اضافية' : 'מידע נוסף'}
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                {lang === 'ar' ? 'تحديث تاريخ الوظيفة' : 'הקפצת המשרה'}
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
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
                      href={`/employer/job-details/${job.id}`}
                      className="text-violet-600 hover:text-violet-800 hover:underline"
                    >
                      {job.jobTitle}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lang === 'ar' ? job.cityName.nameAr || job.cityName.nameHe : job.cityName.nameHe}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    {job.jobDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.salary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`/employer/job-details/${job.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                    >
                      {lang === 'ar' ? 'معلومات اضافية' : 'מידע נוסף'}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onUpdateDate(job.id)}
                      disabled={isLoading}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {lang === 'ar' ? 'تحديث التاريخ' : 'עדכן תאריך'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <JobStatusBadge status={'PENDING'} lang={lang} />
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