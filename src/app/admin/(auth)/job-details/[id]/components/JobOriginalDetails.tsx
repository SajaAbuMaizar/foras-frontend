import React from "react";
import { JobDetailsItem } from "@/types/jobs/JobDetailsItem";

const JobOriginalDetails: React.FC<{ job: JobDetailsItem }> = ({ job }) => (
  <div className="w-full md:w-1/2">
    <h2 className="text-xl font-semibold mb-2">{job.title.original}</h2>
    <h3 className="text-lg text-gray-700 mb-4">{job.description.original}</h3>
    <ul className="text-base space-y-1">
      <li><strong>אזור:</strong> {job.location.getLangHebrew}</li>
      <li><strong>סוג המשרה:</strong> {job.jobType}</li>
      <li><strong>תחום:</strong> {job.industry.getLangHebrew}</li>
      <li><strong>משכורת:</strong> {job.salary}</li>
      <li><strong>المؤهلات المطلوبة:</strong> {job.requiredQualifications.original}</li>
      <li><strong>תאריך פרסום:</strong> {job.publicationDate}</li>
      <li><strong>הסעה:</strong> {job.transportation ? "כן" : "לא"}</li>
    </ul>
  </div>
);

export default JobOriginalDetails;