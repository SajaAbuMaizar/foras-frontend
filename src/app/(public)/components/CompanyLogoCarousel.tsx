'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { EmployerLogoUrlItem } from '@/types/EmployerLogoUrlItem';

type EmployerCarouselProps = {
  logos: EmployerLogoUrlItem[];
};

export default function EmployerCarousel({ logos }: EmployerCarouselProps) {
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollLeft = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setScrollIndex((prev) => Math.min(prev + 1, logos.length - 1));
  };

  return (
    <div className="relative w-full py-8">
      <h1
        id="famous-companies"
        className="text-center text-2xl font-bold text-[#2d7d70] drop-shadow-[2px_2px_8px_#41AE9D] mb-6"
      >
        الشركات المشهورة
      </h1>

      <div className="relative flex items-center justify-center px-12">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)] text-blue-800 hover:scale-110 transition"
          aria-label="Scroll Left"
        >
          <FaChevronLeft size={18} />
        </button>

        {/* Logos container */}
        <div className="w-full">
          <div
            className="flex items-center justify-start gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${scrollIndex * 90}px)` }}
          >
            {logos.map((logo) => (
              <a
                key={logo.id}
                href={`/jobs/${logo.id}`}
                className="h-[70px] flex-shrink-0 rounded-full bg-white shadow-[0_0_0_3px_white,0_0_0_6px_#001f3f] flex items-center justify-center overflow-hidden"
                aria-label={`Visit job for employer ${logo.id}`}
              >
                <Image
                  src={logo.companyLogoUrl}
                  alt={`Logo of employer ${logo.id}`}
                  width={70}
                  height={70}
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/logo-placeholder.png';
                  }}
                  unoptimized
                />
              </a>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)] text-blue-800 hover:scale-110 transition"
          aria-label="Scroll Right"
        >
          <FaChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
