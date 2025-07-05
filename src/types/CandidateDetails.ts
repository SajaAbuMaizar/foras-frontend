export type DriverLicense =
  | "A2"
  | "A1"
  | "A"
  | "B"
  | "C1"
  | "C"
  | "D"
  | "D1"
  | "D2"
  | "D3"
  | "E"
  | "1"
  | ".";

export const DRIVER_LICENSES: DriverLicense[] = [
  "A2",
  "A1",
  "A",
  "B",
  "C1",
  "C",
  "D",
  "D1",
  "D2",
  "D3",
  "E",
  "1",
  ".",
];

export type Skill =
  | "cook"
  | "hotel"
  | "technology"
  | "management"
  | "construction"
  | "customers"
  | "sales"
  | "order"
  | "saver"
  | "barman"
  | "barista"
  | "electricity"
  | "condition"
  | "cars";

export const SKILLS: Skill[] = [
  "cook",
  "hotel",
  "technology",
  "management",
  "construction",
  "customers",
  "sales",
  "order",
  "saver",
  "barman",
  "barista",
  "electricity",
  "condition",
  "cars",
];

export type Language =
  | "arabic"
  | "hebrew"
  | "english"
  | "russian"
  | "french"
  | string;

export const LANGUAGES: Language[] = [
  "arabic",
  "hebrew",
  "english",
  "russian",
  "french",
];

export interface CandidateDetails {
  id: string;
  name: string;
  phone: string;
  area: string;
  gender: "MALE" | "FEMALE";
  knowsHebrew: boolean;
  needsHelp: boolean;
  driverLicenses: DriverLicense[];
  skills: Skill[];
  languages: Language[];
  avatarUrl: string;
}
