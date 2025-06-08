'use client';

import React from 'react';

interface LoadingSpinnerProps {
  visible?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  visible = true,
  message,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary" />
      {message && (
        <p className="mt-4 text-green text-lg text-center px-4">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
