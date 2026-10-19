/**
 * Centralized API Client Abstraction Layer.
 * Connects frontend services to the backend REST API with authentication
 * and a fail-closed, rotating browser session.
 */

import {
  accessTokenNeedsRefresh,
  clearAccessSession,
  getAccessToken,
  setAccessSession,
  shouldRememberSession,
} from "./sessionStore";

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface RefreshResponse {
  access_token: string;
  expires_in: number;
}

const PUBLIC_AUTH_ENDPOINT = /^\/auth\/(login|google|register|refresh|email-verification|password-reset)/;
const REFRESH_LOCK_NAME = "thrift-kro-refresh-session";
let refreshInFlight: Promise<boolean> | null = null;

function getBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL
    || import.meta.env.VITE_API_BASE_URL
    || "http://127.0.0.1:8000/api/v1";
  return configured?.endsWith("/") ? configured.slice(0, -1) : configured;
}

async function runRefresh(): Promise<boolean> {
  try {
    const response = await fetch(`${getBaseUrl()}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Remember-Session": shouldRememberSession() ? "true" : "false",
        "X-Session-Transport": "cookie",
      },
    });
    if (!response.ok) {
      clearAccessSession();
      return false;
    }

    const data = await response.json() as RefreshResponse;
    if (!data.access_token || !Number.isFinite(data.expires_in)) {
      clearAccessSession();
      return false;
    }
    setAccessSession(data.access_token, data.expires_in);
    return true;
  } catch {
    clearAccessSession();
    return false;
  }
}

async function runRefreshWithCrossTabLock(): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.locks) {
    return navigator.locks.request(REFRESH_LOCK_NAME, runRefresh);
  }
  return runRefresh();
}

export async function refreshAccessToken(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = runRefreshWithCrossTabLock().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

function redirectAfterSessionFailure(): void {
  clearAccessSession();
  if (
    typeof window !== "undefined"
    && window.location.pathname !== "/"
    && !window.location.pathname.startsWith("/auth")
  ) {
    window.location.href = "/role-select";
  }
}

async function readError(response: Response): Promise<Error> {
  const errorText = await response.text().catch(() => "");
  try {
    const parsed = JSON.parse(errorText);
    return new Error(parsed.detail || parsed.message || `HTTP ${response.status}`);
  } catch {
    return new Error(errorText || `HTTP ${response.status}: ${response.statusText}`);
  }
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  _legacyMockFallback?: T,
): Promise<ApiResponse<T>> {
  const isPublicAuthRequest = PUBLIC_AUTH_ENDPOINT.test(endpoint);
  const isFormData = options.body instanceof FormData;

  try {
    if (!isPublicAuthRequest && accessTokenNeedsRefresh()) {
      await refreshAccessToken();
    }

    const send = () => {
      const token = isPublicAuthRequest ? null : getAccessToken();
      const headers: Record<string, string> = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers as Record<string, string>),
      };
      return fetch(`${getBaseUrl()}${endpoint}`, {
        ...options,
        credentials: options.credentials ?? "include",
        headers,
      });
    };

    let res = await send();
    if (res.status === 401 && !isPublicAuthRequest && await refreshAccessToken()) {
      res = await send();
    }

    if (!res.ok) {
      if (res.status === 401) {
        redirectAfterSessionFailure();
      }
      throw await readError(res);
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
