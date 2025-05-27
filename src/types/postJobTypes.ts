// app/job-application/components/types.ts
export interface City {
  name: any;
  id: any;
  langHebrew: string;
  arabic: string;
}

export interface Field {
  name: any;
  id: any;
  langHebrew: string;
  arabic: string;
}

export interface Option {
  value: string;
  label: string;
}

export type Language = 'he' | 'ar';