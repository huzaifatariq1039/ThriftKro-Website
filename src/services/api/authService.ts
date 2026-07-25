import { request, ApiResponse } from "./apiClient";
import { Role, User } from "../../types/types";

export interface UserSession {
  email: string;
  role: Role;
  token: string;
  user?: User;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  async login(email: string, pass: string, role: Role = "buyer"): Promise<ApiResponse<UserSession>> {
    // FastAPI OAuth2PasswordRequestForm expects URL-encoded form data with 'username' and 'password'
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", pass);

    const tokenRes = await request<TokenResponse>(
      "/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );

    const token = tokenRes.data.access_token;
    if (token) {
      localStorage.setItem("thrift_kro_token", token);
      localStorage.setItem("access_token", token);
    }

    // Fetch current user profile from /users/me
    try {
      const userRes = await request<any>("/users/me");
      if (userRes.data) {
        const user: User = {
          id: String(userRes.data.id),
          name: userRes.data.full_name || email,
          email: userRes.data.email || email,
          role: (userRes.data.role?.toLowerCase() as Role) || role,
          avatar: userRes.data.avatar_url || null,
        };
        localStorage.setItem("thrift_kro_user", JSON.stringify(user));
        return { data: { email: user.email, role: user.role, token, user }, status: 200 };
      }
    } catch (err) {
      console.warn("Could not fetch user profile after login:", err);
    }

    return { data: { email, role, token }, status: 200 };
  },

  async signup(email: string, pass: string, fullName: string, role: Role = "buyer"): Promise<ApiResponse<UserSession>> {
    await request(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password: pass,
          full_name: fullName,
          role: role.toUpperCase(),
        }),
      }
    );

    // Auto login after registration
    return await this.login(email, pass, role);
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const res = await request<any>("/users/me");
      if (res.data && res.data.id) {
        return {
          id: String(res.data.id),
          name: res.data.full_name,
          email: res.data.email,
          role: res.data.role?.toLowerCase() || "buyer",
          avatar: res.data.avatar_url || null,
        };
      }
    } catch {
      // Fall back to localStorage
    }
    const stored = localStorage.getItem("thrift_kro_user");
    return stored ? JSON.parse(stored) : null;
  },

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    localStorage.removeItem("thrift_kro_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("thrift_kro_user");
    return { data: { success: true }, status: 200 };
  },
};
