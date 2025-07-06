import { apiClient } from "@/lib/api-client";
import { User } from "./types";

export const fetchUser = async (cookie?: string): Promise<User | null> => {
  try {
    const res = await apiClient.get<User>("/api/user/me", {
      headers: cookie ? { cookie } : {},
    });
    return res;
  } catch {
    return null;
  }
};

export const loginCandidate = async (phone: string, password: string) => {
  return await apiClient.post("/api/auth/candidate/login", { phone, password });
};

export const logout = async () => {
  return await apiClient.post("/api/user/logout");
};
