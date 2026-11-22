// Builds the site into dist/: renders templates/index.html with content/site.json, then copies
// site/ (styles and scripts) alongside it.
//
// TRIALWISE_ENV (dev, uat or prod) is set on each Render service; non-prod builds show a banner.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { render } from "./render.mjs";

const env = process.env.TRIALWISE_ENV || "dev";
const content = JSON.parse(readFileSync("content/site.json", "utf8"));
const html = render(readFileSync("templates/index.html", "utf8"), content, {
  env,
  commit: process.env.RENDER_GIT_COMMIT || process.env.GITHUB_SHA || "local",
});
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");
cpSync("site", "dist", { recursive: true });
writeFileSync("dist/index.html", html);
console.log(`built dist/ for ${env}`);
