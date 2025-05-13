import React from 'react';
import Image from 'next/image';

const Banner: React.FC = () => {
  return (
    <div className="relative h-[500px] bg-center bg-cover" style={{ backgroundImage: 'url(/images/avatar-girl.jpg)' }}>
      {/* Search Bar Container */}
      <div className="absolute top-1/2 left-[45%] -translate-x-[15%] -translate-y-[60%] z-20 ">
        {/* Slogan */}
        <div className="text-center text-white uppercase mb-10 text-4xl drop-shadow-[2px_2px_8px_black]">
          ابحث عن وظيفتك المثالية
        </div>

        {/* Search Bar */}
        <form method="post" className="flex gap-3 justify-start items-center" dir="rtl">
          <select className="w-[170px] font-semibold p-4 rounded-lg text-center" style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <option value="all">📍 المنطقة</option>
          </select>
          <select className="w-[170px] font-semibold p-4 rounded-lg text-center" style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <option value="all">⚙️ المجال</option>
          </select>
          <select className="w-[170px] font-semibold p-4 rounded-lg text-center" style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <option value="all">🌐 العبرية</option>
            <option value="true">مع لغة عبرية</option>
            <option value="false">بدون لغة عبرية</option>
          </select>
          <select className="w-[170px] font-semibold p-4 rounded-lg text-center" style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <option value="all">🚗 وسيلة نقل</option>
            <option value="true">مع وسيلة نقل</option>
            <option value="false">بدون وسيلة نقل</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white text-lg font-bold rounded-lg px-7 py-3 shadow-md hover:bg-blue-700"
          >
            بحث
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
