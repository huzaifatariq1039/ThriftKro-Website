import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const buyerService = await readFile(
  new URL("../src/services/api/buyerService.ts", import.meta.url),
  "utf8",
);
const appStore = await readFile(
  new URL("../src/store/useAppStore.ts", import.meta.url),
  "utf8",
);

test("checkout uses the backend contract and a persistent idempotency key", () => {
  assert.match(buyerService, /"Idempotency-Key": idempotencyKey/);
  assert.match(buyerService, /shipping_address_id: shippingAddressId/);
  assert.match(buyerService, /payment_method: "CASH_ON_DELIVERY"/);
  assert.match(buyerService, /if \(!response\.data\?\.order_id\)/);
  assert.match(buyerService, /clearCheckoutKey\(idempotencyKey\)/);
});

test("checkout failure cannot be converted into local success", () => {
  const checkoutBlock = appStore.slice(
    appStore.indexOf("checkoutAsync: async"),
    appStore.indexOf("syncProfile: async"),
  );

  assert.doesNotMatch(checkoutBlock, /buyerService\.checkout\(/);
  assert.doesNotMatch(checkoutBlock, /completing locally/i);
  assert.doesNotMatch(checkoutBlock, /catch\s*\(/);
  assert.match(checkoutBlock, /if \(!response\.data\.order_id\)/);
  assert.ok(
    checkoutBlock.indexOf("response.data.order_id") <
      checkoutBlock.indexOf("handlePurchaseComplete"),
    "local success must happen only after a server order ID is validated",
  );
});
