export interface EmployerProfile {
  id: number;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  companyLogoUrl: string | null;
  preferredLanguage: "ar" | "he";
  createdAt: string;
  lastLogin: string;
}

export interface UpdateEmployerProfileRequest {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  preferredLanguage: "ar" | "he";
}
