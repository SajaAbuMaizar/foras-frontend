'use client';

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


type EmployerLogo = {
  id: string;
  companyLogoUrl: string;
};

type EmployerCarouselProps = {
  logos: EmployerLogo[];
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
    <div className="relative overflow-hidden">
      <h1
        id="famous-companies"
        className="text-center text-2xl font-bold text-[#2d7d70] drop-shadow-[2px_2px_8px_#41AE9D] mb-6"
      >
        الشركات المشهورة
      </h1>

      <div className="overflow-x-auto whitespace-nowrap transition-transform duration-500 ease-in-out scroll-smooth">
        <div
          className="flex gap-6 ml-12"
          style={{
            transform: `translateX(-${scrollIndex * 90}px)`,
          }}
        >
          {logos.map((logo) => (
            <a
              key={logo.id}
              href={`/jobs/${logo.id}`}
              className="inline-block w-[70px] h-[70px] rounded-full overflow-hidden shadow-[0_0_0_3px_white,0_0_0_6px_#001f3f] relative top-2"
            >
              <img src={logo.companyLogoUrl} alt="Logo" className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-blue-800"
        aria-label="Scroll Left"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-blue-800"
        aria-label="Scroll Right"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
