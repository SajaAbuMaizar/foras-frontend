'use client';

import React from 'react';
import PageHeading from './components/PageHeading';
import MapEmbed from './components/MapEmbed';
import OfficeInfo from './components/OfficeInfo';
import ContactForm from './components/ContactForm';
import Image from 'next/image';

const ContactUsPage = () => {
  return (
    <main dir="rtl" className="text-black">
      <PageHeading title="تواصل معنا" image="/images/public-heading.jpg" />

      {/* Map + Office Info */}
      <section className="py-16 px-4 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">موقعنا على الخريطة</h2>
            <MapEmbed />
          </div>
          <OfficeInfo />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">ارسل لنا رسالة</h2>
            <ContactForm />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src="/images/forsa.png" alt="Forsa" width={200} height={200} />
            <h5 className="mt-4 text-center text-xl">Forsa</h5>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;
