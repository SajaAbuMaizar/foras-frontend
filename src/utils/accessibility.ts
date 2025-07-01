export const accessibilityUtils = {
  // Generate unique IDs for form fields
  generateId: (prefix: string): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  // Check if user prefers high contrast
  prefersHighContrast: (): boolean => {
    return window.matchMedia("(prefers-contrast: high)").matches;
  },

  // Get appropriate ARIA label for job card
  getJobCardAriaLabel: (job: any): string => {
    return `משרת ${job.jobTitle} בחברת ${job.employer.companyName}, משכורת ${job.salary} שקלים, ב${job.cityName}`;
  },

  // Format date for screen readers
  formatDateForScreenReader: (date: string): string => {
    const d = new Date(date);
    return d.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
};
