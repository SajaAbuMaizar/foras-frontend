'use client'
import React from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';


const Banner: React.FC = () => {
    // Check if the screen is phone size (≤480px) or tablet size (≤750px)
    const isSmallest = useMediaQuery('(max-width: 450px)');
    const isPhone = useMediaQuery('(max-width: 640px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');
  
    // Determine which image to load based on screen size
    let imageSrc = '/images/avatar-girl.jpg'; // Default: desktop
    if (isSmallest) {
      imageSrc = '/images/avatar_girl_smallest.JPG'; // For smallest phones
    } else if (isPhone) {
      imageSrc = '/images/avatar_girl_phone.JPG'; // For phones
    } else if (isTablet) {
      imageSrc = '/images/avatar_girl_700.JPG'; // For tablets (≤750px)
    } 
  return (
    
    <div className="relative h-[500px] w-full">
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt="Banner background"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* Search Bar Container */}
      <div className="absolute top-1/2 left-[45%] -translate-x-[15%] -translate-y-[45%] z-20">
        {/* Slogan */}
        <div className="text-center text-white uppercase mb-10 text-2xl md:text-3xl xl:text-4xl whitespace-nowrap drop-shadow-[2px_2px_8px_black]">
        ابحث عن وظيفتك المثالية
        </div>

        {/* Search Bar */}
        <form method="post" className="w-full" dir="rtl">
          <div className="flex xl:flex-row flex-col gap-3 items-center">
            <select
              className="w-[200px] p-3 xl:w-[170px] xl:p-4 font-semibold rounded-lg text-center shadow-inner"
              style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)' }}
            >
              <option value="all">📍 المنطقة</option>
            </select>

            <select
              className="w-[200px] p-3 xl:w-[170px] xl:p-4 font-semibold rounded-lg text-center shadow-inner"
              style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)' }}
            >
              <option value="all">⚙️ المجال</option>
            </select>

            <select
              className="w-[200px] p-3 xl:w-[170px] xl:p-4 font-semibold rounded-lg text-center shadow-inner"
              style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)' }}
            >
              <option value="all">🌐 العبرية</option>
              <option value="true">مع لغة عبرية</option>
              <option value="false">بدون لغة عبرية</option>
            </select>

            <select
              className="w-[200px] p-3 xl:w-[170px] xl:p-4 font-semibold rounded-lg text-center shadow-inner"
              style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)' }}
            >
              <option value="all">🚗 وسيلة نقل</option>
              <option value="true">مع وسيلة نقل</option>
              <option value="false">بدون وسيلة نقل</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700
                text-lg px-7 py-3 xl:text-lg xl:px-7 xl:py-3 text-sm px-4 py-2"
            >
              بحث
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
