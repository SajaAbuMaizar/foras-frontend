import { apiClient } from "@/lib/api-client";
import { User } from "./types";

export const fetchUser = async (cookie?: string) => {
  try {
    const user = await apiClient.withRetry(() =>
      apiClient.get<User>("/api/user/me", {
        headers: {
          ...(cookie ? { cookie } : {}),
        },
        validateStatus: (status: number) => status < 500,
      })
    );
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const loginCandidate = async (phone: string, password: string) => {
  try {
    return await apiClient.withRetry(() =>
      apiClient.post("/api/auth/candidate/login", { phone, password })
    );
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Re-throw to let the calling component handle it
  }
};

export const logout = async () => {
  try {
    return await apiClient.withRetry(() => apiClient.post("/api/user/logout"));
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
