import React, { useState } from "react";
import { AdminJobDetailsItem } from "@/types/AdminJobDetailsItem";


const JobOriginalDetails: React.FC<{ job: AdminJobDetailsItem }> = ({ job }) => (
  <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md border border-gray-200">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.titleOriginal}</h2>
      <h3 className="text-lg text-gray-600 leading-relaxed">{job.descriptionOriginal}</h3>
    </div>
    
    <ul className="space-y-3 text-gray-700">
      <li className="flex">
        <strong className="w-40 text-gray-600">אזור:</strong>
        <span>{job.cityName.nameHe}</span>
      </li>
      <li className="flex">
        <strong className="w-40 text-gray-600">סוג המשרה:</strong>
        <span>{job.jobType}</span>
      </li>
      <li className="flex">
        <strong className="w-40 text-gray-600">תחום:</strong>
        <span>{job.industryName.nameHe}</span>
      </li>
      <li className="flex">
        <strong className="w-40 text-gray-600">משכורת:</strong>
        <span>{job.salary}</span>
      </li>
      <li className="flex flex-col">
        <strong className="w-40 text-gray-600 mb-1">הדרישות הנדרשות:</strong>
        <span className="whitespace-pre-line">{job.qualificationsOriginal}</span>
      </li>
      <li className="flex">
        <strong className="w-40 text-gray-600">תאריך פרסום:</strong>
        <span>{new Date(job.createdAt).toLocaleDateString('he-IL')}</span>
      </li>
      <li className="flex">
        <strong className="w-40 text-gray-600">הסעה:</strong>
        <span>{job.transportationAvailable ? "כן" : "לא"}</span>
      </li>
    </ul>
  </div>
);

export default JobOriginalDetails;