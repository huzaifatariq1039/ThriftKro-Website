import { Product, Role, User } from "../types/types";
import { mockProducts, DEFAULT_AVATAR } from "./mockData";

/* ─────────────────────────  API Client Layer  ─────────────────────────
 * Backend Developers: Set API_BASE_URL to your backend API endpoint.
 * Replace mock implementations below with real fetch() / axios calls.
 * All functions return Promises to seamlessly support async API calls.
 ─────────────────────────────────────────────────────────────────────── */

export const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

// Helper for HTTP requests with authorization header token
export async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("thrift_kro_token") || localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } catch (err: any) {
    console.warn(`[fetchWithAuth] Call to ${endpoint} failed:`, err.message);
    throw err;
  }
}

/* ──────────  Auth API  ────────── */
export const authAPI = {
  login: async (email: string, pass: string, role: Role): Promise<{ user: User; token: string }> => {
    // Simulated delay
    await new Promise(r => setTimeout(r, 400));

    const user: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: role === "seller" ? "Priya Sharma" : "Aryan Kapoor",
      email: email || (role === "seller" ? "priya.sharma@gmail.com" : "aryan.kapoor@gmail.com"),
      role: role,
      avatar: DEFAULT_AVATAR,
      phone: role === "seller" ? "+92 300 1234567" : "+92 301 2345678",
    };

    const token = "mock_jwt_token_" + Date.now();
    return { user, token };
  },

  adminLogin: async (email: string, pass: string): Promise<{ user: User; token: string }> => {
    await new Promise(r => setTimeout(r, 600));

    if (email === "admin@thriftkro.pk" && pass === "Admin@123") {
      const user: User = {
        id: "admin_1",
        name: "Super Admin",
        email,
        role: "admin",
      };
      return { user, token: "mock_admin_token_" + Date.now() };
    }
    throw new Error("Invalid admin credentials.");
  },

  signup: async (data: { email: string; name?: string; role: Role }): Promise<{ user: User; token: string }> => {
    await new Promise(r => setTimeout(r, 400));
    const user: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: data.name || "New User",
      email: data.email,
      role: data.role,
      avatar: DEFAULT_AVATAR,
    };
    return { user, token: "mock_jwt_token_" + Date.now() };
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem("thrift_kro_token");
    const storedUser = localStorage.getItem("thrift_kro_user");
    if (token && storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }
    return null;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("thrift_kro_token");
    localStorage.removeItem("thrift_kro_user");
  },
};

/* ──────────  Products API  ────────── */
export const productsAPI = {
  getAll: async (category?: string): Promise<Product[]> => {
    await new Promise(r => setTimeout(r, 100));
    if (!category || category === "All") return mockProducts;
    return mockProducts.filter(p => p.category === category);
  },

  getById: async (id: number): Promise<Product | undefined> => {
    await new Promise(r => setTimeout(r, 50));
    return mockProducts.find(p => p.id === id);
  },

  search: async (query: string): Promise<Product[]> => {
    await new Promise(r => setTimeout(r, 100));
    const q = query.toLowerCase();
    return mockProducts.filter(p => (p.name + p.brand + p.category).toLowerCase().includes(q));
  },
};
