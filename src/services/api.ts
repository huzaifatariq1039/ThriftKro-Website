import { Product, Role, User } from "../types/types";
import { mockProducts, DEFAULT_AVATAR } from "./mockData";

/* ─────────────────────────  API Client Layer  ─────────────────────────
 * Backend Developers: Set API_BASE_URL to your backend API endpoint.
 * Replace mock implementations below with real fetch() / axios calls.
 * All functions return Promises to seamlessly support async API calls.
 ─────────────────────────────────────────────────────────────────────── */
export const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

// Helper for HTTP requests with authorization header token
export async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("thrift_kro_token") || sessionStorage.getItem("thrift_kro_token") || localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
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
// Helper to map backend product to frontend Product type
const mapProduct = (p: any): Product => ({
  id: p.id,
  name: p.name,
  brand: p.brand || "Unbranded",
  price: p.price,
  originalPrice: p.original_price || p.price,
  condition: p.condition,
  size: p.size,
  seller: p.seller_id, // or get seller name from somewhere if possible
  sellerRating: 4.8, // placeholder
  img: p.image_url,
  category: p.category,
});

export const productsAPI = {
  getAll: async (category?: string): Promise<Product[]> => {
    try {
      const qs = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
      const products = await fetchWithAuth<any[]>(`/products${qs}`);
      return products.map(mapProduct);
    } catch (e) {
      console.warn("Failed to fetch products from backend, returning empty array");
      return [];
    }
  },

  getById: async (id: string): Promise<Product | undefined> => {
    try {
      const p = await fetchWithAuth<any>(`/products/${id}`);
      return mapProduct(p);
    } catch (e) {
      return undefined;
    }
  },

  search: async (query: string): Promise<Product[]> => {
    try {
      const products = await fetchWithAuth<any[]>(`/products?q=${encodeURIComponent(query)}`);
      return products.map(mapProduct);
    } catch (e) {
      return [];
    }
  },
};
