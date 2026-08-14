# Deekshi Press — deekshipress.com / deekshipress.in

Frontend-only React + Vite + TypeScript landing page showcasing the AI Series
books (published on Amazon.in by Gooduru Vineeth & Deekshitha S). No backend,
no router — a single static page deployed to Hostinger shared hosting.

## Commands

```bash
npm run dev       # local dev server
npm run build     # tsc -b && vite build → dist/ (this is the verification step; no test runner)
npm run lint      # oxlint
```

## Deploying to Hostinger — READ THIS FIRST

**Never deploy via FTP from this machine. It cannot work.** The local network
(Airtel) cannot reach any Hostinger server IP on any port — connections time
out at the ISP's international gateway. This includes ftp/curl/nc to the
hosting servers AND loading the live sites in a local browser. The sites being
unreachable locally does NOT mean they are down — always verify from an
external vantage point (WebFetch, or a phone on mobile data).

**All deploys go through GitHub Actions** (`.github/workflows/deploy.yml`),
which runs outside the blocked network:

- Automatic: every push to `main` builds and FTPS-uploads `dist/` to both
  domains.
- Manual: `gh workflow run deploy.yml`
- A failed job with `Timeout (control socket)` is a transient Hostinger FTP
  blip — rerun with `gh run rerun <run-id> --failed`.

Full details, credentials layout, and troubleshooting: **docs/DEPLOYMENT.md**.

## Credentials

- Real FTP credentials: local `.env` (gitignored) and GitHub Actions repo
  secrets (`FTP_*` for .com, `FTP_IN_*` for .in). Variable names documented in
  `.env.example`.
- NEVER commit `.env` or put credentials in source/docs. The repo is PUBLIC.
- `gh secret set NAME` without `--body` reads stdin — run non-interactively it
  silently sets an EMPTY secret. Always pass `--body 'value'`.

## Content model

- All book data: `src/data/books.ts` (typed `BOOKS` array). Amazon links are
  derived from each book's ASIN (`amazon.in/dp/<ASIN>`).
- Cover images: `public/covers/<ASIN>.jpg` (640px, listing/hero) and
  `public/covers/<ASIN>-lg.jpg` (1280px, detail dialog).
- Highest-quality source is the book-page PNG in contenthq, not the KDP jpeg:
  `/Users/vineeth/Documents/PersonalProjects/contenthq/books/<slug>/images/page_c0_p1.png`
  (some books use `page_p1.png`; Class 8 has no page PNG — use `books-master/<slug>/cover-ebook.jpg`).
  Resize with:
  `sips --resampleWidth 640 -s format jpeg -s formatOptions 72 <src> --out public/covers/<ASIN>.jpg`
  `sips --resampleWidth 1280 -s format jpeg -s formatOptions 80 <src> --out public/covers/<ASIN>-lg.jpg`
- Adding a book = one entry in `books.ts` + one cover file. Verify the cover
  visually matches the title before shipping — folder names in books-master
  don't always match published titles (e.g. Class 9 uses the `-v2` folder).

## Rules

- Verify `npm run build` passes before committing; pushes to `main` deploy to
  production immediately.
- Design system lives in `src/index.css` ("Exercise Book" concept — ruled
  hero, red margin, grade-band colors via `data-band`). Read it before
  restyling; keep selector specificity flat.
