"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useOptions } from "@/context/options/OptionsContext";
import toast from "react-hot-toast";
import { BannerSkeleton } from "@/components/ui/skeletons";

type BannerProps = {
  searchParams: Record<string, string>;
};

export default function Banner({ searchParams }: BannerProps) {
  const { cities, industries, loading } = useOptions();
  const router = useRouter();

  const [formState, setFormState] = useState({
    city: "all",
    industry: "all",
    hebrewRequired: "all",
    transportationAvailable: "all",
  });

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      ...searchParams,
    }));
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const params = new URLSearchParams(formState).toString();
      router.push(`/?${params}`);
    } catch {
      toast.error("حدث خطأ أثناء البحث");
    } finally {
      setIsSearching(false);
    }
  };

  const isSmallest = useMediaQuery("(max-width: 450px)");
  const isPhone = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  let imageSrc = "/images/avatar-girl.jpg";
  if (isSmallest) imageSrc = "/images/avatar_girl_smallest.JPG";
  else if (isPhone) imageSrc = "/images/avatar_girl_phone.JPG";
  else if (isTablet) imageSrc = "/images/avatar_girl_700.JPG";

  // Show skeleton while loading
  if (loading) {
    return <BannerSkeleton />;
  }

  return (
    <div className="relative h-[500px] w-full">
      <Image
        src={imageSrc}
        alt="Banner background"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      <div className="absolute top-1/2 left-[45%] -translate-x-[15%] -translate-y-[45%] z-20">
        <div className="text-center text-white uppercase mb-10 text-2xl md:text-3xl xl:text-4xl whitespace-nowrap drop-shadow-[2px_2px_8px_black]">
          ابحث عن وظيفتك المثالية
        </div>

        <form onSubmit={handleSubmit} className="w-full" dir="rtl">
          <div className="flex xl:flex-row flex-col gap-3 items-center">
            <select
              name="city"
              value={formState.city}
              onChange={handleInputChange}
              className="w-[200px] p-3 xl:w-[170px] xl:p-4 font-semibold rounded-lg text-center shadow-inner"
            >
              <option value="all">📍 المنطقة</option>
              {cities.map((city) => (
                <option key={city.id} value={city.code}>
                  {city.nameAr}
                </option>
              ))}
            </select>

            <select
              name="industry"
              value={formState.industry}
              onChange={handleInputChange}
              className="w-[200px] p-3 xl:w-[170px] xl:p-4 font-semibold rounded-lg text-center shadow-inner"
            >
              <option value="all">⚙️ المجال</option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.code}>
                  {industry.nameAr}
                </option>
              ))}
            </select>

            <select
              name="hebrewRequired"
              value={formState.hebrewRequired}
              onChange={handleInputChange}
              className="w-[200px] p-3 xl:w-[170px] xl:p-4 font-semibold rounded-lg text-center shadow-inner"
            >
              <option value="all">🌐 العبرية</option>
              <option value="true">مع لغة عبرية</option>
              <option value="false">بدون لغة عبرية</option>
            </select>

            <select
              name="transportationAvailable"
              value={formState.transportationAvailable}
              onChange={handleInputChange}
              className="w-[200px] p-3 xl:w-[170px] xl:p-4 font-semibold rounded-lg text-center shadow-inner"
            >
              <option value="all">🚗 وسيلة نقل</option>
              <option value="true">مع وسيلة نقل</option>
              <option value="false">بدون وسيلة نقل</option>
            </select>

            <button
              type="submit"
              disabled={isSearching}
              className="bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700
                text-lg px-7 py-3 xl:text-lg xl:px-7 xl:py-3 text-sm px-4 py-2
                disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSearching ? "جاري البحث..." : "بحث"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
