import { request, ApiResponse, refreshAccessToken } from "./apiClient";
import { Role, User } from "../../types/types";
import {
  clearAccessSession,
  clearLegacyBrowserSession,
  getAccessToken,
  setAccessSession,
  setRememberSession,
  shouldRememberSession,
} from "./sessionStore";

type AccountRole = Exclude<Role, null>;

export interface UserSession {
  email: string;
  role: AccountRole;
  token: string;
  user: User;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  expires_in: number;
}

function mapServerUser(data: any): User {
  const role = String(data?.role || "").toLowerCase();
  if (!data?.id || !["buyer", "seller", "admin"].includes(role)) {
    throw new Error("The server returned an invalid authenticated user profile");
  }

  return {
    id: String(data.id),
    name: data.full_name || data.email,
    email: data.email,
    role: role as AccountRole,
    avatar: data.avatar_url || null,
  };
}

async function fetchAuthenticatedUser(): Promise<User> {
  const response = await request<any>("/users/me");
  return mapServerUser(response.data);
}

function acceptTokenResponse(response: TokenResponse): string {
  if (!response.access_token || !Number.isFinite(response.expires_in)) {
    throw new Error("The server returned an invalid authenticated session");
  }
  setAccessSession(response.access_token, response.expires_in);
  return response.access_token;
}

export const authService = {
  async login(email: string, pass: string, _requestedRole: AccountRole = "buyer"): Promise<ApiResponse<UserSession>> {
    // FastAPI OAuth2PasswordRequestForm expects URL-encoded form data with 'username' and 'password'
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", pass);

    const tokenRes = await request<TokenResponse>(
      "/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Remember-Session": shouldRememberSession() ? "true" : "false",
          "X-Session-Transport": "cookie",
        },
        body: params.toString(),
      }
    );

    const token = acceptTokenResponse(tokenRes.data);

    try {
      const user = await fetchAuthenticatedUser();
      return { data: { email: user.email, role: user.role as AccountRole, token, user }, status: 200 };
    } catch (error) {
      clearAccessSession();
      throw error;
    }
  },

  async googleAuth(googleToken: string, role: AccountRole): Promise<{ access_token: string, user: User }> {
    const res = await request<any>("/auth/google", {
      method: "POST",
      headers: {
        "X-Remember-Session": shouldRememberSession() ? "true" : "false",
        "X-Session-Transport": "cookie",
      },
      body: JSON.stringify({
        id_token: googleToken,
        role: role.toUpperCase(),
      }),
    });

    const token = acceptTokenResponse(res.data as TokenResponse);

    // Fetch user profile
    try {
      const user = await fetchAuthenticatedUser();
      return { access_token: token, user };
    } catch (error) {
      clearAccessSession();
      throw error;
    }
  },

  async signup(email: string, pass: string, fullName: string, role: AccountRole = "buyer"): Promise<ApiResponse<UserSession>> {
    await request(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password: pass,
          full_name: fullName,
          role: (role || "buyer").toUpperCase(),
        }),
      }
    );

    return await this.login(email, pass, role);
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      if (!getAccessToken() && !await refreshAccessToken()) return null;
      return await fetchAuthenticatedUser();
    } catch {
      clearAccessSession();
      return null;
    }
  },

  async fetchCurrentUser(): Promise<User> {
    return fetchAuthenticatedUser();
  },

  async updateProfile(data: { full_name?: string; phone_number?: string; avatar_url?: string }): Promise<ApiResponse<any>> {
    const res = await request<any>(
      "/users/me",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    return res;
  },

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    try {
      if (getAccessToken()) {
        await request("/auth/logout", { method: "POST" });
      }
    } finally {
      clearAccessSession();
    }
    return { data: { success: true }, status: 200 };
  },

  initializeBrowserSession(): void {
    clearLegacyBrowserSession();
  },

  setRememberMe(remember: boolean): void {
    setRememberSession(remember);
  },

  /** Short-lived access tokens exist only in memory. */
  getToken(): string | null {
    return getAccessToken();
  },
};
