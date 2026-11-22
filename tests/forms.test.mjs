import assert from "node:assert/strict";
import { test } from "node:test";
import { stageLabel, validateDemoRequest } from "../site/js/forms.js";

const good = { name: "Ada Park", email: "ada@example-bio.com", company: "Example Bio", stage: "clinical" };

test("accepts a complete request", () => {
  const result = validateDemoRequest(good);
  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, {});
});

test("trims and lowercases the email", () => {
  const result = validateDemoRequest({ ...good, email: "  Ada@Example-Bio.com " });
  assert.equal(result.value.email, "ada@example-bio.com");
});

test("requires every field", () => {
  const result = validateDemoRequest({});
  assert.equal(result.ok, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ["company", "email", "name", "stage"]);
});

test("rejects malformed and personal emails", () => {
  assert.equal(validateDemoRequest({ ...good, email: "not-an-email" }).errors.email, "Enter a valid email address.");
  assert.equal(validateDemoRequest({ ...good, email: "ada@gmail.com" }).errors.email, "Use your work email.");
});

test("rejects an unknown stage", () => {
  assert.equal(validateDemoRequest({ ...good, stage: "marketing" }).errors.stage, "Choose an area of interest.");
});

test("labels stages", () => {
  assert.equal(stageLabel("launch"), "Launch");
  assert.equal(stageLabel("nope"), "General");
});
