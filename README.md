# Trialwise

A one-page marketing site for **Trialwise**, a fictional life sciences and pharmaceutical
intelligence company. It exists to test [SweeperKeeper](https://github.com/mikechuck/ai-playground):
its PR reviews, repository scans and autonomous fixes run against this repository.

## Environments

| Environment | Branch | Render site | Deploys |
| --- | --- | --- | --- |
| dev | `dev` | `trialwise-dev` | on every push to `dev`, after tests pass |
| uat | `uat` | `trialwise-uat` | on every push to `uat`, after tests pass |
| prod | `main` | `trialwise-prod` | on every push to `main`, after tests pass |

Changes normally move `dev` → `uat` → `main` through pull requests. SweeperKeeper's fixes go
straight to each branch: they're merged automatically into `dev` and `uat` once tests pass, and
wait for a person to approve and merge into `main`.

## Working on it

Requires Node.js 20 or later.

```bash
npm ci                         # install
npm test                       # unit tests
TRIALWISE_ENV=uat npm run build   # build dist/ (dev, uat or prod)
npm start                      # build and serve locally
```

| Path | What's there |
| --- | --- |
| `templates/index.html` | The page template (lodash template) |
| `content/site.json` | The page's text |
| `site/` | Styles and browser scripts, copied into `dist/` |
| `scripts/` | Build and render scripts |
| `tests/` | Unit tests (`node --test`) |
| `render.yaml` | The three Render static sites |
| `.github/workflows/` | `ci.yml` (tests on PRs), `deploy.yml` (deploys on push) |

## One-time setup

1. **Branches:** push `dev`, `uat` and `main`.
2. **Render:** New → Blueprint, pick this repository. It creates the three static sites from
   `render.yaml`. For each site, copy its **Deploy Hook** URL (Settings → Deploy Hook).
3. **GitHub environments** (Settings → Environments): create `dev`, `uat` and `production`. In each:
   - Secret `RENDER_DEPLOY_HOOK`: that environment's deploy hook URL. It's a secret: anyone
     with it can trigger a deploy.
   - Variable `SITE_URL`: the site's address, e.g. `https://trialwise-dev.onrender.com`.
   - For `production`, under **Deployment branches**, allow only `main`.
4. **Branch protection** (Settings → Rules → Rulesets):
   - `dev` and `uat`: require a pull request (0 approvals) and the `test` status check.
   - `main`: require a pull request with **1 approval from a code owner**, and the `test` check.
     Don't add the SweeperKeeper app to the bypass list: prod changes always need a person.
5. **Auto-merge:** Settings → General → Pull Requests → **Allow auto-merge**. SweeperKeeper
   uses it to merge fixes into `dev` and `uat` once the `test` check passes.
