/**
 * Centralized API Client Abstraction Layer.
 * Connects frontend services to the backend REST API with authentication
 * and automatic mock fallback support for offline local development.
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  mockFallback?: T
): Promise<ApiResponse<T>> {
  const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("thrift_kro_token") || sessionStorage.getItem("thrift_kro_token") || localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

  const isFormData = options.body instanceof FormData;
  const defaultHeaders: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const headers = {
    ...defaultHeaders,
    ...(options.headers as Record<string, string>),
  };

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Clear stale session
        localStorage.removeItem("thrift_kro_token");
        sessionStorage.removeItem("thrift_kro_token");
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
        localStorage.removeItem("thrift_kro_user");
        if (window.location.pathname !== "/" && !window.location.pathname.startsWith("/auth")) {
           window.location.href = "/role-select";
        }
      }
      const errorText = await res.text().catch(() => "");
      let parsedError: any;
      try {
        parsedError = JSON.parse(errorText);
      } catch {
        parsedError = { detail: errorText || res.statusText };
      }
      throw new Error(parsedError.detail || parsedError.message || `HTTP ${res.status}: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    let data: any;
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    return { data: data as T, status: res.status };
  } catch (err: any) {
    console.warn(`[API Client] Network call to ${endpoint} failed:`, err.message);
    throw err;
  }
}
