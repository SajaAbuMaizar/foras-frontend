import React from "react";
import { AdminJobDetailsItem } from "@/types/AdminJobDetailsItem";

const JobOriginalDetails: React.FC<{ job: AdminJobDetailsItem }> = ({ job }) => (
  <div className="w-full md:w-1/2">
    <h2 className="text-xl font-semibold mb-2">{job.titleOriginal}</h2>
    <h3 className="text-lg text-gray-700 mb-4">{job.descriptionOriginal}</h3>
    <ul className="text-base space-y-1">
      <li><strong>אזור:</strong> {job.cityName.nameHe}</li>
      <li><strong>סוג המשרה:</strong> {job.jobType}</li>
      <li><strong>תחום:</strong> {job.industryName.nameHe}</li>
      <li><strong>משכורת:</strong> {job.salary}</li>
      <li><strong>المؤهلات المطلوبة:</strong> {job.qualificationsOriginal}</li>
      <li><strong>תאריך פרסום:</strong> {job.publicationDate}</li>
      <li><strong>הסעה:</strong> {job.transportationAvailable ? "כן" : "לא"}</li>
    </ul>
  </div>
);

export default JobOriginalDetails;