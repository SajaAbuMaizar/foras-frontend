// components/JobStatusBadge.tsx
import React from 'react';

type JobStatusBadgeProps = {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  lang: 'ar' | 'he';
};

const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status, lang }) => {
  const statusClasses = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };

  const statusText = {
    PENDING: lang === 'ar' ? 'تم تقديم الطلب وقيد المراجعة' : 'הבקשה הוגשה וממתינה לבדיקה',
    APPROVED: lang === 'ar' ? 'تمت الموافقة على الطلب' : 'הבקשה אושרה',
    REJECTED: lang === 'ar' ? 'تم رفض الطلب' : 'הבקשה נדחתה',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
      {statusText[status]}
    </span>
  );
};

export default JobStatusBadge;