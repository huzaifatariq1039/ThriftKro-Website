import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = relativePath => readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");

const [
  authContext,
  authService,
  router,
  useStore,
  appStore,
  sellerService,
  sellerVerify,
] = await Promise.all([
  readSource("src/contexts/AuthContext.tsx"),
  readSource("src/services/api/authService.ts"),
  readSource("src/router.tsx"),
  readSource("src/hooks/useStore.ts"),
  readSource("src/store/useAppStore.ts"),
  readSource("src/services/api/sellerService.ts"),
  readSource("src/features/seller/pages/SellerVerify.tsx"),
]);

test("session restoration fails closed on the authenticated server profile", () => {
  assert.match(authContext, /"restoring" \| "authenticated" \| "anonymous"/);
  assert.match(authContext, /authStatus === "authenticated" && Boolean\(user && token\)/);
  assert.match(authService, /async function fetchAuthenticatedUser\(\)[\s\S]*return mapServerUser\(response\.data\)/);
  assert.match(authService, /catch \{\s*clearAccessSession\(\);\s*return null;/);
  assert.doesNotMatch(authService, /stored \? JSON\.parse\(stored\)/);
});

test("the server role cannot be rewritten by the selected portal", () => {
  assert.match(authContext, /sessionUser\.role !== expectedRole/);
  assert.match(authContext, /role: user\?\.role \|\| null/);
  assert.doesNotMatch(authContext, /setRole|unlockedRoles|loginWithToken/);
  assert.match(useStore, /await auth\.logout\(\);[\s\S]*navigate\(target === "buyer"/);
});

test("buyer, seller, and admin routes wait for restoration and enforce roles", () => {
  assert.match(router, /if \(authStatus === "restoring"\) return <PageLoader \/>/);
  assert.match(router, /if \(!isAuthenticated\) return <Navigate/);
  assert.match(router, /if \(role !== requiredRole\) return <Navigate/);

  const buyerRoutes = router.match(/path="\/buyer\/[^\"]+" element={<WebApp><RoleGuard requiredRole="buyer">/g) || [];
  assert.equal(buyerRoutes.length, 13);
  for (const path of ["verify", "profile", "profile/edit", "notifications", "privacy"]) {
    assert.match(router, new RegExp(`path="/seller/${path.replace("/", "\\/")}" element={<WebApp><RoleGuard requiredRole="seller">`));
  }

  assert.match(router, /sellerVerificationLoadState === "error" \|\| s\.sellerVerified !== "verified"/);
  assert.match(router, /<RoleGuard requiredRole="admin">/);
});

test("seller verification failures never become local success", () => {
  assert.match(appStore, /const serverState = await get\(\)\.fetchVerificationStatus\(\)/);
  assert.match(appStore, /set\(\{ sellerVerificationError: message \}\);[\s\S]*throw err;/);
  assert.doesNotMatch(appStore, /Offline \/ network error[\s\S]*sellerVerified: "pending"/);
  assert.doesNotMatch(appStore, /submitSellerVerification:\s*\(\)/);
  assert.doesNotMatch(appStore, /setSellerVerified/);

  assert.match(sellerService, /can_submit: res\.data\?\.can_submit === true/);
  assert.match(sellerVerify, /!statusData\?\.can_submit/);
  assert.match(sellerVerify, /No verification request has been submitted/);
  assert.match(sellerVerify, /sellerVerificationLoadState === "error"/);
});
