import { stageLabel, validateDemoRequest } from "./forms.js";

// Greet visitors who arrive from a partner link, e.g. ?ref=Acme%20Bio
const params = new URLSearchParams(window.location.search);
const ref = params.get("ref");
if (ref) {
  const welcome = document.getElementById("welcome");
  welcome.innerHTML = "Welcome, visitor from " + ref;
  welcome.hidden = false;
}

const form = document.getElementById("demo-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const result = validateDemoRequest(data);
  form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  if (!result.ok) {
    for (const field of Object.keys(result.errors)) {
      form.elements[field]?.setAttribute("aria-invalid", "true");
    }
    status.textContent = Object.values(result.errors)[0];
    return;
  }
  // No backend: this is a demo site.
  status.textContent = `Thanks, ${result.value.name}. We'll be in touch about ${stageLabel(result.value.stage)}.`;
  form.reset();
});
