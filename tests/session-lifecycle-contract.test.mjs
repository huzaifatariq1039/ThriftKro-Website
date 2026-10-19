import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = relativePath => readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");

const [
  sessionStore,
  apiClient,
  authService,
  authContext,
  authPage,
  legacyApi,
  vtoService,
  vercel,
] = await Promise.all([
  readSource("src/services/api/sessionStore.ts"),
  readSource("src/services/api/apiClient.ts"),
  readSource("src/services/api/authService.ts"),
  readSource("src/contexts/AuthContext.tsx"),
  readSource("src/features/auth/pages/AuthPage.tsx"),
  readSource("src/services/api.ts"),
  readSource("src/services/api/vtoService.ts"),
  readSource("vercel.json"),
]);

test("tokens and profiles are not persisted in browser storage", () => {
  assert.match(sessionStore, /let accessToken: string \| null = null/);
  assert.match(sessionStore, /LEGACY_AUTH_KEYS = \["thrift_kro_token", "access_token", "thrift_kro_user"\]/);
  assert.doesNotMatch(authService, /setItem\([^\n]*(token|user)/i);
  assert.doesNotMatch(apiClient, /(localStorage|sessionStorage)\.getItem/);
  assert.doesNotMatch(legacyApi, /(localStorage|sessionStorage)\.getItem/);
  assert.doesNotMatch(vtoService, /(localStorage|sessionStorage)\.getItem/);
});

test("refresh rotation is cookie based single flight and fails closed", () => {
  assert.match(apiClient, /credentials: "include"/);
  assert.match(apiClient, /"X-Session-Transport": "cookie"/);
  assert.match(apiClient, /let refreshInFlight: Promise<boolean> \| null = null/);
  assert.match(apiClient, /navigator\.locks\.request\(REFRESH_LOCK_NAME, runRefresh\)/);
  assert.match(apiClient, /res\.status === 401[\s\S]*await refreshAccessToken\(\)[\s\S]*res = await send\(\)/);
  assert.match(apiClient, /catch \{\s*clearAccessSession\(\);\s*return false;/);
  assert.match(authService, /!getAccessToken\(\) && !await refreshAccessToken\(\)/);
  assert.match(authContext, /restoredUser[\s\S]*authService\.getToken\(\)/);
});

test("remember me only controls server cookie persistence", () => {
  assert.match(authPage, /useState\(false\)/);
  assert.match(authPage, /s\.setRememberMe\(rememberMe\)[\s\S]*s\.loginWithCredentials/);
  assert.match(authPage, /onSuccess:[\s\S]*s\.setRememberMe\(rememberMe\)[\s\S]*s\.googleAuth/);
  assert.match(authService, /"X-Remember-Session": shouldRememberSession\(\) \? "true" : "false"/);
  assert.match(authService, /"X-Session-Transport": "cookie"/);
});

test("production deployment applies a restrictive script policy", () => {
  const config = JSON.parse(vercel);
  const headers = config.headers[0].headers;
  const csp = headers.find(header => header.key === "Content-Security-Policy")?.value || "";
  assert.match(csp, /script-src 'self' https:\/\/accounts\.google\.com/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.ok(headers.some(header => header.key === "X-Content-Type-Options" && header.value === "nosniff"));
});
