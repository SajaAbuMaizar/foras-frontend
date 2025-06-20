export interface JobListItem {
    id: string;
    jobTitle: string;
    cityName: {
      nameAr: string;
      nameHe: string;
    };
    jobDescription: string;
    salary: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  };