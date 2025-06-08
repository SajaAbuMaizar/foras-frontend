// components/JobDetails.tsx
import React from 'react';
import { EmployerJobDetailsItem } from '@/types/EmployerJobDetailsItem';

interface JobDetailsProps {
  job: EmployerJobDetailsItem;
  lang: 'ar' | 'he' | null;
}


const JobDetails: React.FC<JobDetailsProps> = ({ job, lang }) => {
  const isArabic = lang === 'ar' || lang === null;

  // Helper function to get localized text
  const t = (arabicText: string, hebrewText: string) => {
    return isArabic ? arabicText : hebrewText;
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(isArabic ? 'ar-EG' : 'he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-5 md:p-8">
        <h1 className="text-2xl font-bold mb-6 p-5">
          {t('تفاصيل الوظيفة', 'פרטי משרה')}
        </h1>

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Job Image Section */}
            <div className="w-full md:w-1/3">
              <img
                src={job.imageUrl}
                alt="Job Image"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Job Details */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                {job.jobTitle}
              </h2>
              <h3 className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                {job.jobDescription}
              </h3>

              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex">
                  <strong className="w-1/3 md:w-1/4">
                    {t('تفاصيل الوظيفة', 'אזור:')}
                  </strong>
                  <span>
                    {isArabic
                      ? job.cityName.nameAr
                      : job.cityName.nameHe}
                  </span>
                </li>
                <li className="flex">
                  <strong className="w-1/3 md:w-1/4">
                    {t('نوع الوظيفة', 'סוג המשרה:')}
                  </strong>
                  <span>{job.jobType}</span>
                </li>
                <li className="flex">
                  <strong className="w-1/3 md:w-1/4">
                    {t('المجال', 'תחום:')}
                  </strong>
                  <span>
                    {isArabic
                      ? job.industryName.nameAr
                      : job.cityName.nameHe}
                  </span>
                </li>
                <li className="flex">
                  <strong className="w-1/3 md:w-1/4">
                    {t('الراتب', 'משכורת:')}
                  </strong>
                  <span>{job.salary}</span>
                </li>
                <li className="flex">
                  <strong className="w-1/3 md:w-1/4">
                    {t('المؤهلات المطلوبة', 'כישורים נדרשים:')}
                  </strong>
                  <span>{job.requiredQualifications}</span>
                </li>
                <li className="flex">
                  <strong className="w-1/3 md:w-1/4">
                    {t('تاريخ النشر', 'תאריך פרסום:')}
                  </strong>
                  <span>{job.createdAt}</span>
                </li>
                <li className="flex">
                  <strong className="w-1/3 md:w-1/4">
                    {t('مواصلات', 'הסעה:')}
                  </strong>
                  <span>
                    {job.transportationAvailable
                      ? t('نعم', 'כן')
                      : t('لا', 'לא')}
                  </span>
                </li>
                <li className="flex">
                  <strong className="w-1/3 md:w-1/4">
                    {t('عدد المتقدمين', 'מספר המועמדים:')}
                  </strong>
                  <span>{job.candidates.length}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* List of Applicants */}
          <div className="mt-12 p-5 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">
              {t('قائمة المتقدمين', 'רשימת המועמדים')}
            </h3>

            {job.candidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {job.candidates.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 text-center"
                  >
                    <h4 className="text-lg font-medium mb-2">
                      {applicant.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {applicant.phone}
                    </p>
                  {/*  <p className="text-sm text-gray-500 dark:text-gray-400">
                      {applicant.knowsHebrew
                        ? t('يعرف العبرية', 'Knows Hebrew')
                        : t('لا يعرف العبرية', 'Does not know Hebrew')}
                    </p>*/}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                {t('لا يوجد متقدمين بعد', 'אין מועמדים עדיין')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;