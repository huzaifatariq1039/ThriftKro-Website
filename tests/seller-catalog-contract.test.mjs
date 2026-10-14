import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const productService = await readFile(
  new URL("../src/services/api/productService.ts", import.meta.url),
  "utf8",
);
const sellerAdd = await readFile(
  new URL("../src/features/seller/pages/SellerAdd.tsx", import.meta.url),
  "utf8",
);
const sellerListings = await readFile(
  new URL("../src/features/seller/pages/SellerListings.tsx", import.meta.url),
  "utf8",
);

test("listing images are uploaded before product creation", () => {
  assert.match(productService, /new FormData\(\)/);
  assert.match(productService, /"\/upload\/image"/);
  assert.match(productService, /Promise\.all\(productData\.imageFiles\.map\(uploadProductImage\)\)/);
  assert.match(productService, /image_url: imageUrl/);
  assert.doesNotMatch(sellerAdd, /readAsDataURL|base64/);
});

test("product creation uses the normalized backend contract", () => {
  assert.match(productService, /category_id: productData\.categoryId/);
  assert.match(productService, /quantity_in_stock: variant\.quantityInStock/);
  assert.match(productService, /attributes: variant\.attributes/);
  assert.match(productService, /is_ai_verified: false/);
  assert.doesNotMatch(productService, /department:|image_url: productData\.img/);
});

test("seller form uses server categories and real per-size variants", () => {
  assert.match(sellerAdd, /productService\.getCategories\(\)/);
  assert.match(sellerAdd, /categoryId/);
  assert.match(sellerAdd, /imageFiles: images\.map\(image => image\.file\)/);
  assert.match(sellerAdd, /attributes: \{ size \}/);
  assert.match(sellerAdd, /quantityInStock: numericStock/);
  assert.doesNotMatch(sellerAdd, /simulateAi|AI identified/);
});

test("seller inventory uses the authenticated endpoint and truthful mutations", () => {
  assert.match(productService, /"\/products\/seller\/me"/);
  assert.match(sellerListings, /productService\.getSellerListings\(\)/);
  assert.match(sellerListings, /await productService\.deleteListing\(id\)/);
  assert.match(sellerListings, /await productService\.restoreListing\(id\)/);
  assert.doesNotMatch(sellerListings, /Math\.random/);
});
