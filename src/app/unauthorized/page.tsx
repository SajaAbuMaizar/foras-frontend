'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';

export default function UnauthorizedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'Unknown';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-500 rounded-full p-4">
            <FaLock className="text-4xl" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-1">
          You do not have permission to view this page.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Your role: <span className="font-semibold text-red-600">{role}</span>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row justify-center">
          <button
            onClick={() => router.back()}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-sm"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-sm"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
