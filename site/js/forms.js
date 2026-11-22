// Checks a demo request before it's sent. Pure functions, so they run in Node tests too.

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FREE_MAIL = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
export const STAGES = ["discovery", "clinical", "regulatory", "launch", "commercial"];

export function validateDemoRequest(request) {
  const errors = {};
  const name = (request.name || "").trim();
  const email = (request.email || "").trim().toLowerCase();
  const company = (request.company || "").trim();

  if (!name) errors.name = "Enter your name.";
  else if (name.length > 100) errors.name = "Name is too long.";

  if (!email) errors.email = "Enter your work email.";
  else if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  else if (FREE_MAIL.includes(email.split("@")[1])) errors.email = "Use your work email.";

  if (!company) errors.company = "Enter your company.";
  if (!STAGES.includes(request.stage)) errors.stage = "Choose an area of interest.";

  return { ok: Object.keys(errors).length === 0, errors, value: { name, email, company, stage: request.stage } };
}

export function stageLabel(id) {
  const labels = {
    discovery: "Discovery",
    clinical: "Clinical development",
    regulatory: "Regulatory",
    launch: "Launch",
    commercial: "Commercial",
  };
  return labels[id] || "General";
}
