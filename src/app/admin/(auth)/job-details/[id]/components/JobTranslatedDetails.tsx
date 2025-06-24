import React from "react";
import { AdminJobDetailsItem } from "@/types/AdminJobDetailsItem";

interface Props {
  job: AdminJobDetailsItem;
  showTranslationFields: boolean;
  handleTranslate: (e: React.FormEvent<HTMLFormElement>) => void;
}

const JobTranslatedDetails: React.FC<Props> = ({ job, showTranslationFields, handleTranslate }) => (
  <div className="w-full md:w-1/2 pl-6">
    <form onSubmit={handleTranslate} className="space-y-2">
      <div>
        <strong>العنوان:</strong>
        <h2 className="text-xl font-semibold">
          {job.titleTranslated || "لم يتم الترجمة بعد"}
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
          {job.descriptionTranslated || "لم يتم الترجمة بعد"}
        </h3>
        {showTranslationFields && (
          <textarea
            name="translatedDescription"
            className="form-textarea w-full border rounded px-2 py-1"
          />
        )}
      </div>

      <ul className="text-base space-y-1">
        <li><strong>المنطقة:</strong> {job.cityName.nameAr}</li>
        <li><strong>نوع الوظيفة:</strong> {job.jobType}</li>
        <li><strong>المجال:</strong> {job.cityName.nameAr}</li>
        <li><strong>الراتب:</strong> {job.salary}</li>
        <li>
          <strong>المؤهلات المطلوبة:</strong> {job.qualificationsTranslated || "لم يتم الترجمة بعد"}
          {showTranslationFields && (
            <textarea
              name="translatedRequiredQualifications"
              className="form-textarea w-full border rounded px-2 py-1"
            />
          )}
        </li>
        <li><strong>تاريخ النشر:</strong> {job.publicationDate}</li>
        <li><strong>وسيلة نقل:</strong> {job.transportationAvailable ? "نعم" : "لا"}</li>
      </ul>

      {showTranslationFields && (
        <button type="submit" className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow hover:shadow-lg transition">
          احفظ الترجمة
        </button>
      )}
    </form>
  </div>
);

export default JobTranslatedDetails;