"use client";
import React from 'react';
import JobDetailsPage from '../job-details/[id]/page';

interface Job {
  id: number;
  jobImageUrl: string;
  title: {
    original: string;
    translated?: string;
  };
  description: {
    original: string;
    translated?: string;
  };
  requiredQualifications: {
    original: string;
    translated?: string;
  };
  location: {
    getLangHebrew: string;
    getArabic: string;
  };
  jobType: string;
  industry: {
    getLangHebrew: string;
    getArabic: string;
  };
  salary: string;
  publicationDate: string;
  transportation: boolean;
  status: string;
}


export default function AdminDashboard() {
  const mockJob: Job = {
    id: 1,
    jobImageUrl: "/images/job-image.jpg",
    title: {
      original: "מפתח Full Stack",
      translated: "مطور Full Stack"
    },
    description: {
      original: "דרוש/ה מפתח/ת Full Stack עם ניסיון ב-React ו-Node.js",
      translated: "مطلوب مطور Full Stack بخبرة في React و Node.js"
    },
    requiredQualifications: {
      original: "ניסיון של 3+ שנים, שליטה ב-JavaScript, יכולת עבודה בצוות",
      translated: "خبرة 3+ سنوات، إتقان JavaScript، القدرة على العمل ضمن فريق"
    },
    location: {
      getLangHebrew: "תל אביב",
      getArabic: "تل أبيب"
    },
    jobType: "משרה מלאה",
    industry: {
      getLangHebrew: "הייטק",
      getArabic: "تكنولوجيا"
    },
    salary: "25,000-30,000 ש\"ח",
    publicationDate: "2023-10-15",
    transportation: true,
    status: "PENDING" // or "APPROVED"
  };

  return (
    <div>
      <JobDetailsPage job={mockJob} />
    </div>
  );
}