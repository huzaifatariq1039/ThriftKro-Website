import { request, ApiResponse } from "./apiClient";
import { Role } from "@/types/types";

export interface UserSession {
  email: string;
  role: Role;
  token: string;
}

export const authService = {
  async login(email: string, pass: string, role: "buyer" | "seller"): Promise<ApiResponse<UserSession>> {
    const session: UserSession = {
      email,
      role,
      token: `mock-jwt-token-${role}-${Date.now()}`,
    };
    return request<UserSession>("/auth/login", { method: "POST", body: JSON.stringify({ email, pass, role }) }, session);
  },

  async signupSeller(): Promise<ApiResponse<UserSession>> {
    const session: UserSession = {
      email: "new.seller@thriftkro.pk",
      role: "seller",
      token: `mock-jwt-token-seller-${Date.now()}`,
    };
    return request<UserSession>("/auth/signup-seller", { method: "POST" }, session);
  },

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    return request<{ success: boolean }>("/auth/logout", { method: "POST" }, { success: true });
  },
};
