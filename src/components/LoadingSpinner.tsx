import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary" />
    </div>
  );
};

export default LoadingSpinner;
