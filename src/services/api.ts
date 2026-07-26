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

import { authService } from "./api/authService";

export const authAPI = {
  login: async (email: string, pass: string, role: Role): Promise<{ user: User; token: string }> => {
    const res = await authService.login(email, pass, role);
    return { user: res.data.user!, token: res.data.token };
  },

  adminLogin: async (email: string, pass: string): Promise<{ user: User; token: string }> => {
    const res = await authService.login(email, pass, "admin");
    return { user: res.data.user!, token: res.data.token };
  },

  signup: async (data: { email: string; name?: string; role: Role; password?: string }): Promise<{ user: User; token: string }> => {
    const res = await authService.signup(data.email, data.password || "defaultPass123", data.name || "New User", data.role);
    return { user: res.data.user!, token: res.data.token };
  },

  getCurrentUser: async (): Promise<User | null> => {
    return await authService.getCurrentUser();
  },

  logout: async (): Promise<void> => {
    await authService.logout();
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
