import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const workflow = await readFile(
  new URL("../.github/workflows/frontend-quality.yml", import.meta.url),
  "utf8",
);

test("the local quality gate requires types, contracts, and a production build", () => {
  assert.equal(packageJson.scripts.typecheck, "tsc --noEmit");
  assert.match(packageJson.scripts.check, /npm run typecheck/);
  assert.match(packageJson.scripts.check, /npm run test:frontend/);
  assert.match(packageJson.scripts.check, /npm run build/);
});

test("CI installs the lockfile and runs the same quality gate", () => {
  assert.match(workflow, /node-version: 22/);
  assert.match(workflow, /run: npm ci/);
  assert.match(workflow, /run: npm run check/);
});
