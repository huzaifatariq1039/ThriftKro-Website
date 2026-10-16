import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = relativePath => readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");

const [authService, buyerEditProfile, sellerEditProfile, sellerMessages] = await Promise.all([
  readSource("src/services/api/authService.ts"),
  readSource("src/features/buyer/pages/BuyerEditProfile.tsx"),
  readSource("src/features/seller/pages/SellerEditProfile.tsx"),
  readSource("src/features/seller/pages/SellerMessages.tsx"),
]);

test("browser sockets send bearer credentials through subprotocols", () => {
  assert.match(sellerMessages, /new WebSocket\(wsUrl, \["bearer", token\]\)/);
  assert.doesNotMatch(sellerMessages, /[?&]token=/);
});

test("profile forms do not advertise or submit unverified email changes", () => {
  for (const source of [buyerEditProfile, sellerEditProfile]) {
    assert.doesNotMatch(source, /email:\s*f\.email/);
    assert.match(source, /readOnly/);
    assert.match(source, /Email changes require a verified account-recovery flow/);
  }
  assert.doesNotMatch(
    authService,
    /async updateProfile\(data: \{[^}]*email\?:/,
  );
});
