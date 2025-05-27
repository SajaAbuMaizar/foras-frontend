// lib/api.ts
export interface City {
    name: string;
    id: number;
  langHebrew: string;
  arabic: string;
}

export interface Field {
    name: string;
    id: number;
  langHebrew: string;
  arabic: string;
}

export async function fetchCities(): Promise<City[]> {
  // In a real app, you would fetch this from your API
  return [
    { langHebrew: 'ירושלים', arabic: 'القدس' , name: 'Jerusalem', id: 1 },
    { langHebrew: 'תל אביב', arabic: 'تل أبيب' , name: 'Tel Aviv', id: 2 },
    // Add more cities as needed
  ];
}

export async function fetchFields(): Promise<Field[]> {
  // In a real app, you would fetch this from your API
  return [
    { langHebrew: 'הייטק', arabic: 'هايتك' , name: 'High Tech', id: 1 },
    { langHebrew: 'רפואה', arabic: 'طب' , name: 'Medicine', id: 2 },
    // Add more fields as needed
  ];
}