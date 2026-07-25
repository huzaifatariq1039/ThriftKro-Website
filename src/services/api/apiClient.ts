/**
 * Centralized API Client Abstraction Layer.
 * Wraps network calls with unified base URL, headers, and async mock delays.
 * Ready for production Axios/Fetch REST or GraphQL integration.
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const MOCK_DELAY_MS = 150;

export async function request<T>(endpoint: string, options: RequestInit = {}, mockFallback?: T): Promise<ApiResponse<T>> {
  // Simulate network latency for mock data layer
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS));

  if (mockFallback !== undefined) {
    return {
      data: mockFallback,
      status: 200,
      message: "Success (Mock Data)",
    };
  }

  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
    const res = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    const data = await res.json();
    return { data, status: res.status };
  } catch (err: any) {
    throw new Error(`API Request Error: ${err.message || err}`);
  }
}
