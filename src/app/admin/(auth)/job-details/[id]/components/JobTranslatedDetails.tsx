import React from "react";
import { JobDetailsItem } from "@/types/jobs/JobDetailsItem";

interface Props {
  job: JobDetailsItem;
  showTranslationFields: boolean;
  handleTranslate: (e: React.FormEvent<HTMLFormElement>) => void;
}

const JobTranslatedDetails: React.FC<Props> = ({ job, showTranslationFields, handleTranslate }) => (
  <div className="w-full md:w-1/2 pl-6">
    <form onSubmit={handleTranslate} className="space-y-2">
      <div>
        <strong>العنوان:</strong>
        <h2 className="text-xl font-semibold">
          {job.title.translated || "لم يتم الترجمة بعد"}
        </h2>
        {showTranslationFields && (
          <input
            type="text"
            name="translatedTitle"
            maxLength={20}
            className="form-input w-full border rounded px-2 py-1"
          />
        )}
      </div>

      <div>
        <strong>الوصف:</strong>
        <h3 className="text-gray-700">
          {job.description.translated || "لم يتم الترجمة بعد"}
        </h3>
        {showTranslationFields && (
          <textarea
            name="translatedDescription"
            className="form-textarea w-full border rounded px-2 py-1"
          />
        )}
      </div>

      <ul className="text-base space-y-1">
        <li><strong>المنطقة:</strong> {job.location.getArabic}</li>
        <li><strong>نوع الوظيفة:</strong> {job.jobType}</li>
        <li><strong>المجال:</strong> {job.industry.getArabic}</li>
        <li><strong>الراتب:</strong> {job.salary}</li>
        <li>
          <strong>المؤهلات المطلوبة:</strong> {job.requiredQualifications.translated || "لم يتم الترجمة بعد"}
          {showTranslationFields && (
            <textarea
              name="translatedRequiredQualifications"
              className="form-textarea w-full border rounded px-2 py-1"
            />
          )}
        </li>
        <li><strong>تاريخ النشر:</strong> {job.publicationDate}</li>
        <li><strong>وسيلة نقل:</strong> {job.transportation ? "نعم" : "لا"}</li>
      </ul>

      {showTranslationFields && (
        <button type="submit" className="btn btn-primary mt-4">
          احفظ الترجمة
        </button>
      )}
    </form>
  </div>
);

export default JobTranslatedDetails;