'use client';
import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  backgroundImage: string;
};

const PageHeader = ({ title, subtitle, backgroundImage }: Props) => (
  <section
    className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-70" />
    <div className="relative z-10 text-center text-white">
      <h4 className="text-2xl mb-2">{subtitle}</h4>
      <h2 className="text-4xl font-bold">{title}</h2>
    </div>
  </section>
);

export default PageHeader;
