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

/**
 * Decides where to store tokens based on the "Remember Me" preference.
 * - "Remember Me" ON  → localStorage (persists after browser close)
 * - "Remember Me" OFF → sessionStorage (cleared when browser/tab closes)
 */
function getStorage(): Storage {
  const remember = localStorage.getItem("thrift_kro_remember");
  return remember === "false" ? sessionStorage : localStorage;
}

/** Save auth tokens and user to the chosen storage */
function saveSession(token: string, user?: User) {
  const store = getStorage();
  store.setItem("thrift_kro_token", token);
  store.setItem("access_token", token);
  if (user) {
    store.setItem("thrift_kro_user", JSON.stringify(user));
  }
  // Also keep in localStorage so the remember preference itself persists
  localStorage.setItem("thrift_kro_remember", localStorage.getItem("thrift_kro_remember") || "true");
}

/** Read a value from whichever storage has it */
function getStored(key: string): string | null {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
}

/** Clear session from both storages */
function clearSession() {
  ["thrift_kro_token", "access_token", "thrift_kro_user"].forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
  localStorage.removeItem("thrift_kro_remember");
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
      saveSession(token);
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
        saveSession(token, user);
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
          role: (role || "buyer").toUpperCase(),
        }),
      }
    );

    // Auto login after registration — signups always remember
    localStorage.setItem("thrift_kro_remember", "true");
    return await this.login(email, pass, role);
  },

  async getCurrentUser(): Promise<User | null> {
    // Only try to restore session if we have a stored token
    const token = getStored("thrift_kro_token");
    if (!token) return null;

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
      // Fall back to stored user
    }
    const stored = getStored("thrift_kro_user");
    return stored ? JSON.parse(stored) : null;
  },

  async updateProfile(data: { full_name?: string; email?: string; phone_number?: string; avatar_url?: string }): Promise<ApiResponse<any>> {
    const res = await request<any>(
      "/users/me",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    // After update, if we have a stored user, let's update it locally
    const stored = getStored("thrift_kro_user");
    if (stored && res.data) {
      const parsed = JSON.parse(stored);
      if (res.data.full_name) parsed.name = res.data.full_name;
      if (res.data.email) parsed.email = res.data.email;
      if (res.data.avatar_url) parsed.avatar = res.data.avatar_url;
      saveSession(getStored("thrift_kro_token") || "", parsed);
    }
    return res;
  },

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    clearSession();
    return { data: { success: true }, status: 200 };
  },

  /** Utility: get token from whichever storage has it */
  getToken(): string | null {
    return getStored("thrift_kro_token");
  },
};
