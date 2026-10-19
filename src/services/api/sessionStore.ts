const REMEMBER_SESSION_KEY = "thrift_kro_remember";
const LEGACY_AUTH_KEYS = ["thrift_kro_token", "access_token", "thrift_kro_user"];

export const SESSION_UPDATED_EVENT = "thrift-kro:session-updated";
export const SESSION_CLEARED_EVENT = "thrift-kro:session-cleared";

let accessToken: string | null = null;
let accessTokenExpiresAt = 0;

function emit(name: string): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(name));
  }
}

export function clearLegacyBrowserSession(): void {
  if (typeof window === "undefined") return;
  for (const key of LEGACY_AUTH_KEYS) {
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  }
}

export function setRememberSession(remember: boolean): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(REMEMBER_SESSION_KEY, remember ? "true" : "false");
  }
}

export function shouldRememberSession(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(REMEMBER_SESSION_KEY) === "true";
}

export function setAccessSession(token: string, expiresInSeconds: number): void {
  accessToken = token;
  accessTokenExpiresAt = Date.now() + Math.max(0, expiresInSeconds) * 1000;
  emit(SESSION_UPDATED_EVENT);
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function accessTokenNeedsRefresh(): boolean {
  return Boolean(accessToken) && accessTokenExpiresAt <= Date.now() + 15_000;
}

export function clearAccessSession(): void {
  accessToken = null;
  accessTokenExpiresAt = 0;
  clearLegacyBrowserSession();
  emit(SESSION_CLEARED_EVENT);
}
