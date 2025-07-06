import React from "react";

interface LoadingSpinnerProps {
  visible?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  visible,
  message,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        {message && (
          <p className="mt-4 text-gray-700 dark:text-gray-300">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
