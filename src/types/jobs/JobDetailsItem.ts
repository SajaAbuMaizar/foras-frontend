export interface JobDetailsItem {
    id: number;
    jobImageUrl: string;
    title: {
      original: string;
      translated?: string;
    };
    description: {
      original: string;
      translated?: string;
    };
    requiredQualifications: {
      original: string;
      translated?: string;
    };
    location: {
      getLangHebrew: string;
      getArabic: string;
    };
    jobType: string;
    industry: {
      getLangHebrew: string;
      getArabic: string;
    };
    salary: string;
    publicationDate: string;
    transportation: boolean;
    status: string;
  }