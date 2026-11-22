// Renders the page template with the site content. Used by build.mjs and the tests.
import template from "lodash/template.js";

export const ENVIRONMENTS = ["dev", "uat", "prod"];

export function render(source, content, { env = "dev", commit = "local", year } = {}) {
  if (!ENVIRONMENTS.includes(env)) {
    throw new Error(`TRIALWISE_ENV must be one of ${ENVIRONMENTS.join(", ")} (got "${env}")`);
  }
  const page = template(source);
  return page({ ...content, env, commit: commit.slice(0, 7), year: year ?? new Date().getFullYear() });
}
