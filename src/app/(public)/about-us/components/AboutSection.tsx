'use client';
import Image from 'next/image';
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaBehance } from 'react-icons/fa';

const AboutSection = () => (
  <section className="py-16 px-4 lg:px-24 border-b border-gray-200">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6">منصة فرصة للتوظيف</h2>
        <h4 className="text-xl text-[#1a6692] mb-4">رؤيتنا</h4>
        <p className="mb-6 border-b pb-5">
          نقدم لكم منصة الوظائف الخاصة بنا، حيث نسعى جاهدين لربط المواهب الواعدة بالفرص المهنية المثلى...
        </p>
        <div className="flex gap-4 mt-4 text-[#1a6692]">
          <a href="#"><FaFacebookF size={20} /></a>
          <a href="#"><FaTwitter size={20} /></a>
          <a href="#"><FaLinkedinIn size={20} /></a>
          <a href="#"><FaBehance size={20} /></a>
        </div>
      </div>
      <div>
        <Image
          src="/images/about-1-570x350.jpg"
          alt="عن المنصة"
          width={570}
          height={350}
          className="w-full h-auto object-cover rounded-lg shadow"
        />
      </div>
    </div>
  </section>
);

export default AboutSection;
