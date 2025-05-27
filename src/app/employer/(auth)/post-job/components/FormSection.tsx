import React, { ReactNode } from 'react';

type FormSectionProps = {
  children: ReactNode;
};

export default function FormSection({ children }: FormSectionProps) {
  return (
      <div className="w-full lg:w-5/12 px-4">
        {children}
      </div>
  );
}
