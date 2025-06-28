import { apiClient } from "@/lib/api-client";

export const updateEmployerLanguage = async (lang: "ar" | "he") => {
  try {
    return await apiClient.withRetry(() =>
      apiClient.post("/api/employer/change-lang", { lang })
    );
  } catch (error) {
    console.error("Error updating employer language:", error);
    // Custom handling for language update failures
    throw new Error("Failed to update language. Please try again.");
  }
};
