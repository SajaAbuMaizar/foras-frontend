"use client";

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
} from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "@/context/auth/AuthHooks";
import { isCandidate } from "@/context/auth/types";
import { toast } from "react-hot-toast";

interface Props {
  job: MainPageJobListItem;
  onLoginRequired: () => void; // Callback to show login modal
}

export default function JobCard({ job, onLoginRequired }: Props) {
  const [showShare, setShowShare] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("تم نسخ الرابط");
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً للتقديم للوظيفة");
      onLoginRequired();
      return;
    }

    // Check if user is a candidate
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً لحفظ الوظيفة");
      onLoginRequired();
      return;
    }

    // Check if user is a candidate
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
    <div className="text-center p-5 relative" dir="rtl">
      <div className="shadow-lg w-[333px] rounded-[30px] border border-gray-200 overflow-hidden">
        <a href={`/job-details/${job.id}`}>
          <div className="w-full h-[180px] relative rounded-t-[30px] overflow-hidden">
            <Image
              src={job.imageUrl}
              alt="Job"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={85}
              className="object-cover"
            />
          </div>
        </a>
        <div className="relative text-center mt-2 p-3">
          <a href={`/jobs/${job.employer.id}`}>
            <img
              src={job.employer.companyLogoUrl}
              alt="Logo"
              className="w-[50px] h-[50px] object-contain absolute right-[18px] top-0 rounded-full shadow-[0_0_0_2px_white,_0_0_0_4px_rgb(0,31,63)]"
            />
          </a>

          {/* Share Button */}
          <div className="absolute top-0 left-3">
            <button
              className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full shadow-md"
              onClick={() => setShowShare(!showShare)}
            >
              <FaShareAlt className="text-gray-700" />
            </button>
          </div>

          <a href={`/job-details/${job.id}`}>
            <h4 className="text-[#1a6692] text-xl mb-2">{job.jobTitle}</h4>
          </a>

          <h6 className="inline-block max-w-[16ch] truncate text-xl">
            <FaShekelSign className="inline-block ml-1" />
            <span>{job.salary}</span>
          </h6>

          {/* Company */}
          <div className="flex justify-center items-center text-[#1a6692] gap-1">
            <FaUniversity />
            <span>{job.employer.companyName}</span>
          </div>

          {/* Type */}
          <div className="flex justify-center items-center text-[#1a6692] gap-1">
            <FaBriefcase />
            <span>{jobTypeMap[job.jobType] || job.jobType}</span>
          </div>

          {/* Details */}
          <div className="flex justify-center items-center gap-4 text-base mt-2">
            <div className="flex text-base items-center gap-1">
              <FaCalendar />
              <span>{job.publishDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaMapMarker />
              <span>{job.cityName}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRoad />
              <span data-lat={job.latitude} data-lon={job.longitude}>
                —
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-2 flex-wrap mt-4">
            <a 
              href={`/job-details/${job.id}`}
              className="shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] font-semibold border border-transparent rounded-[10px] px-4 py-1 text-blue-600 hover:bg-blue-50 transition-colors"
            >
              اقرأ المزيد
            </a>
            
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] font-semibold border border-transparent rounded-[10px] px-4 py-1 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isApplying ? "جاري التقديم..." : "تقديم"}
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] font-semibold border border-transparent rounded-[10px] px-4 py-1 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "جاري الحفظ..." : "حفظ"}
            </button>
          </div>

          {/* Tags */}
          {job.transportationAvailable && (
            <div
              className="absolute top-4 left-[-1px] top-[48px] bg-green-600 text-white px-3 py-1 text-sm font-medium shadow-md z-10"
              style={{
                clipPath: "polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)",
              }}
            >
              <div className="flex items-center gap-1">
                <FaBus className="text-white" />
                <span>مواصلات</span>
              </div>
            </div>
          )}
          {!job.hebrewRequired && (
            <div
              className="absolute top-4 left-[-1px] top-[80px] bg-blue-600 text-white px-3 py-1 text-sm font-medium shadow-md z-10"
              style={{
                clipPath: "polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)",
              }}
            >
              <div className="flex items-center gap-1">
                <span>بدون عبري</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Share Dropdown */}
      {showShare && (
        <div className="absolute left-[30px] top-[255px] bg-white shadow-lg rounded-md border border-gray-300 text-right z-20 min-w-[160px] py-2">
          <a
            href={`https://wa.me/?text=تفقد هذه الوظيفة: https://foras.co.il/job-details/${job.id}`}
            target="_blank"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <FaWhatsapp className="inline ml-2 text-green-500" />
            مشاركة عبر واتساب
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://foras.co.il/job-details/${job.id}`}
            target="_blank"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <FaFacebook className="inline ml-2 text-blue-600" />
            مشاركة عبر فيسبوك
          </a>
          <button
            onClick={() =>
              handleCopy(`https://foras.co.il/job-details/${job.id}`)
            }
            className="block px-4 py-2 hover:bg-gray-100 w-full text-right"
          >
            <FaLink className="inline ml-2 text-gray-500" />
            نسخ الرابط
          </button>
        </div>
      )}
    </div>
  );
}