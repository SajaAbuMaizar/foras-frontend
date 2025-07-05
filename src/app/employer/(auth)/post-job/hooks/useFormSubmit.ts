"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type FormSubmitOptions = {
  successMessage: {
    ar: string;
    he: string;
  };
  errorMessage: {
    ar: string;
    he: string;
  };
  redirectPath: string;
  lang: string;
};

export const useFormSubmit = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
    options: FormSubmitOptions
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      // Log form data for debugging
      console.log("Form data:", Object.fromEntries(formData.entries()));

      const response = await fetch("/api/job/job-application", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }

      toast.success(
        options.lang === "ar"
          ? options.successMessage.ar
          : options.successMessage.he
      );
      router.push(options.redirectPath);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        options.lang === "ar"
          ? options.errorMessage.ar
          : options.errorMessage.he
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
};
