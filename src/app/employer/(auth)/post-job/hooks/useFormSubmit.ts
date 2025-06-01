import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useFormSubmit = (setIsLoading: (loading: boolean) => void) => {
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch('/api/employer/job-application', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (response.ok) {
        router.push('/employer/dashboard');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      alert('There was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleSubmit };
};