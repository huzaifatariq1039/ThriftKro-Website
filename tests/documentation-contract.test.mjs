import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

test("the frontend runbook names the current backend and quality contracts", () => {
  for (const statement of [
    "VITE_API_URL=http://localhost:8000/api/v1",
    "npm run check",
    "sign-in calls the backend",
    "No default or demo administrator account is provisioned",
    "AI product verification and virtual try-on are deferred",
  ]) {
    assert.match(readme, new RegExp(statement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("the frontend runbook does not publish obsolete demo credentials", () => {
  assert.doesNotMatch(readme, /Admin@123/);
  assert.doesNotMatch(readme, /hardcoded email\/password check/);
  assert.doesNotMatch(readme, /Figma Make bundle/);
});
