# Deploying to Hostinger

This site is a static Vite build (`dist/`) served from Hostinger shared
hosting on two domains. Deployment is fully automated through GitHub Actions.
This document is the reference for how it works, why it's built this way, and
how to fix it when something breaks.

## TL;DR for agents

```bash
git push                       # any push to main deploys both domains
gh workflow run deploy.yml     # manual deploy without a code change
gh run list --limit 3          # check status
gh run rerun <run-id> --failed # retry a transiently-failed job
```

Do **not** attempt FTP/SFTP/curl from the local machine — see
[The network block](#the-network-block-important).

## Hosting layout

One Hostinger account (`u550114944`), two websites:

| Domain | FTP host | FTP username | FTP home directory |
|---|---|---|---|
| deekshipress.com | `ftp.deekshipress.com` | `u550114944.deekshipresscom` | `/home/u550114944/domains/deekshipress.com/public_html` |
| deekshipress.in | `ftp.deekshipress.in` | `u550114944.deekshipressin` | `/home/u550114944/domains/deekshipress.in/public_html` |

Key fact: **each FTP account's home directory IS the site's `public_html`**,
so the deploy action uploads to `server-dir: ./` — not `public_html/`.
Uploading to `public_html/` would create a nested `public_html/public_html/`.

Hostinger's original parking file `default.php` still exists in both docroots.
It's harmless — `index.html` takes precedence — but if you ever see the
"You Are All Set to Go!" parking page, it means `index.html` is missing from
the docroot, not that hosting is broken.

## Credentials

Passwords are never stored in this repo (it is **public**). They live in:

1. **GitHub Actions repo secrets** (what deploys actually use):
   - `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` — deekshipress.com
   - `FTP_IN_SERVER`, `FTP_IN_USERNAME`, `FTP_IN_PASSWORD` — deekshipress.in
2. **Local `.env`** at the repo root (gitignored) — human reference copy.
3. **hPanel** (source of truth): Websites → site → Files → FTP Accounts.

`.env.example` documents the variable names.

### Rotating the password

1. Change it in hPanel first (both FTP accounts if both should change).
2. Update the secrets — always with `--body`, never interactively:
   ```bash
   gh secret set FTP_PASSWORD --body 'NEW_PASSWORD'
   gh secret set FTP_IN_PASSWORD --body 'NEW_PASSWORD'
   ```
   **Warning:** `gh secret set NAME` without `--body` reads stdin; in a
   non-interactive shell it silently saves an *empty* secret and the next
   deploy fails auth. This has happened once already.
3. Update local `.env` to match.
4. Verify: `gh workflow run deploy.yml` and confirm both jobs succeed.

## The workflow

`.github/workflows/deploy.yml` — two independent jobs (`deploy-com`,
`deploy-in`), each: checkout → Node 22 → `npm ci` → `npm run build` →
`SamKirkland/FTP-Deploy-Action@v4.3.5` over explicit FTPS
(`protocol: ftps`, `security: loose` — loose because Hostinger's cert doesn't
always match the FTP hostname; traffic is still encrypted).

The action syncs incrementally using a `.ftp-deploy-sync-state.json` state
file it keeps on the server. Triggers: push to `main`, or manual
`workflow_dispatch`. A `concurrency: deploy` group serializes overlapping
runs.

The repo must stay **public** for Actions to run free of billing — the
account's private-repo Actions were blocked by a billing failure (2026-08).
If the repo is ever made private again, fix GitHub billing first or deploys
will not start ("job was not started because recent account payments have
failed").

## The network block (IMPORTANT)

The development machine's ISP (Airtel) cannot reach any Hostinger server IP
on **any** port (21, 22, 80, 443, 990, 65002 all time out; traceroute dies
just past the ISP's international gateway at hop ~5). Verified 2026-08-14
against all three Hostinger IPs (193.203.185.16, 88.222.243.132,
147.79.69.234) while unrelated FTP/HTTPS destinations worked fine.

Consequences:

- Local FTP clients, `curl ftp://`, and `lftp` will always time out. This is
  not a credentials problem. Don't burn time retrying.
- The live sites may not load in a local browser either. **Site unreachable
  locally ≠ site down.** Verify externally instead (see below).
- `hpanel.hostinger.com` IS reachable locally (it's behind Cloudflare), so
  the web File Manager remains a manual fallback: build locally, zip `dist/`,
  upload + extract via hPanel File Manager into `public_html`.

## Verifying a deploy

1. Both workflow jobs green:
   `gh run view <run-id> --json conclusion,jobs`
2. Fetch the live site from an external vantage (WebFetch tool, uptime
   checker, or phone on mobile data). Add a cache-buster (`?v=N`) — WebFetch
   caches responses for ~15 minutes.
3. Expected signal: the page `<title>` is
   "Deekshi Press — AI & STEM books for curious Indian kids". (The site is a
   client-rendered SPA, so non-JS fetchers only see the title — that's
   normal, not a broken page.)

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `Timeout (control socket)` in deploy job | Transient Hostinger FTP blip (observed in practice) | `gh run rerun <run-id> --failed` |
| `530 Login incorrect` | Secret doesn't match hPanel password (e.g. empty secret from interactive `gh secret set`) | Re-set the secret with `--body`, matching hPanel |
| Job "not started" / billing annotation | Repo private + GitHub billing failure | Keep repo public, or fix billing |
| Parking page "You Are All Set to Go!" | `index.html` missing in docroot | Re-run deploy; check job logs for which dir files went to |
| Site loads with stale content | Browser/proxy cache | Hard refresh; check `dist/assets` filenames changed (they're content-hashed) |
| Everything times out from local machine | ISP block (see above) | Deploy via Actions; verify externally |

## History / context

- 2026-08-14: Initial deploy of the landing page to both domains via GitHub
  Actions after direct FTP proved impossible from the local network. Repo
  made public to unblock Actions. FTP details provided from hPanel; the
  `ftp://193.203.185.16` IP shown in hPanel's overview was reachable from
  GitHub runners but the FTP *hostnames* are what the secrets use.
