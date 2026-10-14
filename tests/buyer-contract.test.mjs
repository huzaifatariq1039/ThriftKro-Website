import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const buyerService = await readFile(
  new URL("../src/services/api/buyerService.ts", import.meta.url),
  "utf8",
);
const productService = await readFile(
  new URL("../src/services/api/productService.ts", import.meta.url),
  "utf8",
);
const appStore = await readFile(
  new URL("../src/store/useAppStore.ts", import.meta.url),
  "utf8",
);

test("cart mutations use backend variant and cart-item contracts", () => {
  assert.match(buyerService, /"\/shopping\/cart\/add"/);
  assert.match(buyerService, /product_variant_id: productVariantId, quantity/);
  assert.doesNotMatch(buyerService, /cart\/add\/\$\{product/);
  assert.match(buyerService, /cart\/remove\/\$\{cartItemId\}/);
  assert.match(buyerService, /cart\/item\/\$\{cartItemId\}/);
});

test("cart state is refreshed from the server before success is shown", () => {
  const addBlock = appStore.slice(
    appStore.indexOf("addToCart: async"),
    appStore.indexOf("updateCartQty: async"),
  );

  assert.match(addBlock, /buyerService\.addToCart\(p\.variantId, quantity\)/);
  assert.match(addBlock, /await get\(\)\.syncCart\(\)/);
  assert.ok(
    addBlock.indexOf("await get().syncCart()") < addBlock.indexOf("Added to cart"),
    "success must be shown only after the authoritative cart refresh",
  );
  assert.doesNotMatch(addBlock, /cart:\s*\[\.\.\.state\.cart/);
});

test("catalog mapping retains nested images, categories, and purchasable variants", () => {
  assert.match(productService, /Array\.isArray\(bp\.variants\)/);
  assert.match(productService, /variantId: defaultVariant\?\.id/);
  assert.match(productService, /images\.find\(\(image: any\) => image\.is_primary\)/);
  assert.match(productService, /bp\.category\.name/);
});

test("order history consumes nested seller orders and line items", () => {
  const ordersBlock = buyerService.slice(
    buyerService.indexOf("function mapOrder"),
    buyerService.indexOf("const CHECKOUT_IDEMPOTENCY_KEY"),
  );

  assert.match(ordersBlock, /order\.seller_orders/);
  assert.match(ordersBlock, /sellerOrder\.items/);
  assert.match(ordersBlock, /price_at_purchase/);
  assert.match(ordersBlock, /variant_attributes/);
});
