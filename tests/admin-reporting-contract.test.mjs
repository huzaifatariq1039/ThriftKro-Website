import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const service = readFileSync(
  new URL("../src/services/api/adminService.ts", import.meta.url),
  "utf8",
);
const overview = readFileSync(
  new URL("../src/features/admin/pages/PageOverview.tsx", import.meta.url),
  "utf8",
);

test("admin metrics use explicit reporting units and payment states", () => {
  assert.match(service, /total_checkout_orders/);
  assert.match(service, /total_seller_orders/);
  assert.match(service, /recognized_platform_revenue_pkr/);
  assert.match(service, /settled_gmv_pkr/);
  assert.match(service, /escrow_held_pkr/);
  assert.doesNotMatch(service, /total_platform_revenue_pkr/);
  assert.doesNotMatch(service, /\* \(1 \/ 0\.02\)/);
});

test("overview labels settlement snapshots without fabricated financial trends", () => {
  assert.match(overview, /Recognized Platform Revenue/);
  assert.match(overview, /settled payments only/);
  assert.match(overview, /Financial Settlement Snapshot/);
  assert.doesNotMatch(overview, /revenueWeek|revenueMonth|escrowData/);
  assert.doesNotMatch(overview, /PKR 450,000|PKR 27,000/);
});
