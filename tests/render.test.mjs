import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { render } from "../scripts/render.mjs";

const source = readFileSync("templates/index.html", "utf8");
const content = JSON.parse(readFileSync("content/site.json", "utf8"));

test("renders every lifecycle stage", () => {
  const html = render(source, content, { env: "prod", year: 2026 });
  for (const stage of content.stages) assert.ok(html.includes(`id="${stage.id}"`), stage.id);
});

test("shows a banner outside prod only", () => {
  assert.ok(render(source, content, { env: "dev" }).includes("DEV environment"));
  assert.ok(render(source, content, { env: "uat" }).includes("UAT environment"));
  assert.ok(!render(source, content, { env: "prod" }).includes("environment</div>"));
});

test("escapes content", () => {
  const html = render(source, { ...content, tagline: "<script>alert(1)</script>" }, { env: "prod" });
  assert.ok(!html.includes("<script>alert(1)</script>"));
  assert.ok(html.includes("&lt;script&gt;"));
});

test("refuses an unknown environment", () => {
  assert.throws(() => render(source, content, { env: "staging" }), /TRIALWISE_ENV/);
});

test("shows the short commit", () => {
  assert.ok(render(source, content, { env: "prod", commit: "abcdef1234567" }).includes("Build abcdef1"));
});
