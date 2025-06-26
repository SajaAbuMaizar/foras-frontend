export type User =
  | {
      id: number;
      name: string;
      type: "candidate";
    }
  | {
      id: number;
      name: string;
      type: "employer";
      companyLogoUrl?: string | null;
    };

export interface AuthContextType {
  user: User | null | undefined;
  refreshUser: () => Promise<void>;
  signout: () => void;
}

// Optional type guards
export function isEmployer(
  user: User
): user is Extract<User, { type: "employer" }> {
  return user.type === "employer";
}

export function isCandidate(
  user: User
): user is Extract<User, { type: "candidate" }> {
  return user.type === "candidate";
}
