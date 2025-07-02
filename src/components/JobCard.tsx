// Updated JobCard.tsx with integrated modal

import { useState } from "react";
import { MainPageJobListItem } from "@/types/jobs/MainPageJobListItem";
import {
  FaShekelSign,
  FaShareAlt,
  FaWhatsapp,
  FaFacebook,
  FaLink,
  FaUniversity,
  FaBriefcase,
  FaCalendar,
  FaMapMarker,
  FaRoad,
  FaBus,
  FaTimes,
  FaInfoCircle,
  FaClipboardList,
  FaBuilding,
  FaLanguage,
} from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "@/context/auth/AuthHooks";
import { isCandidate } from "@/context/auth/types";
import { toast } from "react-hot-toast";
import { JobDetailsModal } from "@/components/modals/JobDetailsModal";

interface Props {
  job: MainPageJobListItem;
  onLoginRequired: () => void;
}

export default function JobCard({ job, onLoginRequired }: Props) {
  const [showShare, setShowShare] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("تم نسخ الرابط");
  };

  const handleApply = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً للتقديم للوظيفة");
      onLoginRequired();
      return;
    }

    if (!isCandidate(user)) {
      toast.error("يمكن للمرشحين فقط التقديم للوظائف");
      return;
    }

    setIsApplying(true);
    try {
      const response = await fetch(`/api/job-applications/${job.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("تم التقديم للوظيفة بنجاح!");
        setShowModal(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 409) {
          toast.error("لقد تقدمت لهذه الوظيفة من قبل");
        } else {
          toast.error(errorData.message || "حدث خطأ أثناء التقديم للوظيفة");
        }
      }
    } catch (error) {
      console.error("Application error:", error);
      toast.error("حدث خطأ أثناء التقديم للوظيفة");
    } finally {
      setIsApplying(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً لحفظ الوظيفة");
      onLoginRequired();
      return;
    }

    if (!isCandidate(user)) {
      toast.error("يمكن للمرشحين فقط حفظ الوظائف");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/candidate/save-job/${job.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("تم حفظ الوظيفة بنجاح!");
        setShowModal(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 409) {
          toast.error("هذه الوظيفة محفوظة بالفعل");
        } else {
          toast.error(errorData.message || "حدث خطأ أثناء حفظ الوظيفة");
        }
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("حدث خطأ أثناء حفظ الوظيفة");
    } finally {
      setIsSaving(false);
    }
  };

  const jobTypeMap: Record<string, string> = {
    "1": "دوام كامل",
    "2": "دوام جزئي",
    motherhood: "وظيفة ام",
    student: "وظيفة طالب",
    youth: "وظيفة شاب\\ة",
    shifts: "وظيفة ورديات",
    night: "وظيفة ليلية",
  };

  return (
    <>
      <div className="text-center p-5 relative" dir="rtl">
        <div className="shadow-xl w-[333px] rounded-[30px] border border-gray-200 overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
          <a href={`/job-details/${job.id}`}>
            <div className="w-full h-[180px] relative rounded-t-[30px] overflow-hidden">
              <Image
                src={job.imageUrl}
                alt="Job"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </a>

          <div className="relative mt-3 px-4 pb-5 text-center">
            {/* Company Logo */}
            <a href={`/jobs/${job.employer.id}`}>
              <img
                src={job.employer.companyLogoUrl}
                alt="Logo"
                className="w-[50px] h-[50px] object-contain absolute right-4 top-[-25px] rounded-full shadow-[0_0_0_2px_white,_0_0_0_4px_rgb(0,31,63)] bg-white"
              />
            </a>

            {/* Share Button */}
            <div className="absolute top-[-25px] left-4">
              <button
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-full shadow-md transition"
                onClick={() => setShowShare(!showShare)}
              >
                <FaShareAlt className="text-gray-700" />
              </button>
            </div>

            {/* Title */}
            <a href={`/job-details/${job.id}`}>
              <h4 className="text-[#1a6692] text-xl font-bold mt-5 mb-2">
                {job.jobTitle}
              </h4>
            </a>

            {/* Salary */}
            <div className="text-xl text-gray-800 mb-1 truncate max-w-[16ch] mx-auto">
              <FaShekelSign className="inline ml-1 text-green-600" />
              <span>{job.salary}</span>
            </div>

            {/* Employer */}
            <div className="flex justify-center items-center text-[#1a6692] gap-1 text-sm mb-1">
              <FaUniversity />
              <span>{job.employer.companyName}</span>
            </div>

            {/* Job Type */}
            <div className="flex justify-center items-center text-[#1a6692] gap-1 text-sm mb-2">
              <FaBriefcase />
              <span>{jobTypeMap[job.jobType] || job.jobType}</span>
            </div>

            {/* Info Row */}
            <div className="flex justify-center items-center gap-4 text-sm text-gray-700 mb-4">
              <div className="flex items-center gap-1">
                <FaCalendar className="text-blue-600" />
                <span>{job.publishDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaMapMarker className="text-red-500" />
                <span>{job.cityName}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRoad className="text-gray-500" />
                <span data-lat={job.latitude} data-lon={job.longitude}>
                  —
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center flex-wrap gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-1 rounded-[10px] font-semibold shadow-inner transition"
              >
                اقرأ المزيد
              </button>
              <button
                onClick={handleApply}
                disabled={isApplying}
                className="bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1 rounded-[10px] font-semibold shadow-inner transition"
              >
                {isApplying ? "جاري التقديم..." : "تقديم"}
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1 rounded-[10px] font-semibold shadow-inner transition"
              >
                {isSaving ? "جاري الحفظ..." : "حفظ"}
              </button>
            </div>

            {/* Share Options */}
            {showShare && (
              <div className="absolute top-14 left-4 bg-white rounded-lg shadow-xl p-3 z-10 flex gap-2">
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(
                        window.location.origin + `/job-details/${job.id}`
                      )}`
                    )
                  }
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  <FaWhatsapp />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.origin + `/job-details/${job.id}`
                      )}`
                    )
                  }
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  <FaFacebook />
                </button>
                <button
                  onClick={() =>
                    handleCopy(
                      window.location.origin + `/job-details/${job.id}`
                    )
                  }
                  className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition"
                >
                  <FaLink />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        job={job}
        onApply={handleApply}
        onSave={handleSave}
        isApplying={isApplying}
        isSaving={isSaving}
      />
    </>
  );
}
