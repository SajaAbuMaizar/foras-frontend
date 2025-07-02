import React, { useState } from "react";
import {
  FaShekelSign,
  FaUniversity,
  FaBriefcase,
  FaCalendar,
  FaMapMarker,
  FaBus,
  FaLanguage,
  FaTimes,
  FaInfoCircle,
  FaClipboardList,
  FaBuilding,
} from "react-icons/fa";
import { MainPageJobListItem } from "@/types/jobs/MainPageJobListItem";

// Job Details Modal Component
interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: MainPageJobListItem | null;
  onApply: () => void;
  onSave: () => void;
  isApplying: boolean;
  isSaving: boolean;
}

export const JobDetailsModal = ({
  isOpen,
  onClose,
  job,
  onApply,
  onSave,
  isApplying,
  isSaving,
}: JobDetailsModalProps) => {
  if (!isOpen || !job) return null;

  const jobTypeMap = {
    "1": "دوام كامل",
    "2": "دوام جزئي",
    motherhood: "وظيفة ام",
    student: "وظيفة طالب",
    youth: "وظيفة شاب\\ة",
    shifts: "وظيفة ورديات",
    night: "وظيفة ليلية",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        {" "}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[75vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="إغلاق"
          >
            <FaTimes className="w-5 h-5 text-gray-600" />
          </button>
          {/* Modal Content with Scrollbar */}{" "}
          <div className="overflow-y-auto max-h-[75vh] scrollbar-thin scrollbar-thumb-gray-300">
            {/* Header Image */}{" "}
            <div className="relative h-40 w-full">
              <img
                src={job.imageUrl}
                alt={job.jobTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Company Logo */}
              <div className="absolute bottom-4 right-4">
                <img
                  src={job.employer.companyLogoUrl}
                  alt={job.employer.companyName}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white object-contain"
                />
              </div>
            </div>
            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Title and Company */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.jobTitle}
                </h2>
                <div className="flex items-center gap-2 text-lg text-gray-600">
                  <FaUniversity className="text-blue-600" />
                  <span>{job.employer.companyName}</span>
                </div>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                {/* Salary */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaShekelSign className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الراتب</p>
                    <p className="font-semibold text-gray-800">{job.salary}</p>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaBriefcase className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">نوع الوظيفة</p>
                    <p className="font-semibold text-gray-800">
                      {jobTypeMap[job.jobType as keyof typeof jobTypeMap] ||
                        job.jobType}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FaMapMarker className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الموقع</p>
                    <p className="font-semibold text-gray-800">
                      {job.cityName}
                    </p>
                  </div>
                </div>

                {/* Industry */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaBuilding className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">المجال</p>
                    <p className="font-semibold text-gray-800">
                      {job.industryName}
                    </p>
                  </div>
                </div>

                {/* Transportation */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FaBus className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">المواصلات</p>
                    <p className="font-semibold text-gray-800">
                      {job.transportationAvailable ? "متوفرة" : "غير متوفرة"}
                    </p>
                  </div>
                </div>

                {/* Hebrew Required */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FaLanguage className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">اللغة العبرية</p>
                    <p className="font-semibold text-gray-800">
                      {job.hebrewRequired ? "مطلوبة" : "غير مطلوبة"}
                    </p>
                  </div>
                </div>

                {/* Publish Date */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FaCalendar className="text-gray-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">تاريخ النشر</p>
                    <p className="font-semibold text-gray-800">
                      {job.publishDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <FaInfoCircle className="text-blue-600" />
                  <h3>وصف الوظيفة</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.jobDescription}
                  </p>
                </div>
              </div>

              {/* Required Qualifications */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <FaClipboardList className="text-green-600" />
                  <h3>المؤهلات المطلوبة</h3>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.requiredQualifications}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={onApply}
                  disabled={isApplying}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold shadow-md transition-colors"
                >
                  {isApplying ? "جاري التقديم..." : "تقديم للوظيفة"}
                </button>
                <button
                  onClick={onSave}
                  disabled={isSaving}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold shadow-md transition-colors"
                >
                  {isSaving ? "جاري الحفظ..." : "حفظ الوظيفة"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
