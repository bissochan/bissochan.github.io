# personal-site

Personal portfolio of Luca Bissoli: Astro (static) + Tailwind CSS + shadcn/ui, in English (`/`) and Italian (`/it/`).
Decisions and expert review: [docs/project-brief.md](docs/project-brief.md).

## Run locally

```bash
cp .env.example .env      # then set SITE_URL
npm install
npm run dev               # http://localhost:4321, hot reload
npm run build && npm run preview   # production build, with the CSP active
npm run check             # type check (content schemas included)
```

## Where the content lives

| What | File |
|------|------|
| Name, email, links, CV, "open to work" badge, hero tags, skills | `src/data/site.ts` |
| Interface text and About section, both languages | `src/i18n/ui.ts` |
| Work experience (`en`/`it` fields) | `src/content/experience.yaml` |
| Education (`en`/`it` fields) | `src/content/education.yaml` |
| Projects, one Markdown file per language | `src/content/projects/{en,it}/<slug>.md` |
| Photo | `src/assets/photo.png` |
| Social preview image (1200×630) | `public/og.png` |

Schemas are in `src/content.config.ts`: a missing or wrong field fails the build.
To prepare a project without publishing it, set `draft: true` in its front matter.

## Deploy (GitHub Pages)

1. Create the repository `bissochan.github.io` on GitHub and push `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Settings → Secrets and variables → Actions → Variables: `SITE_URL=https://bissochan.github.io`.

`.github/workflows/deploy.yml` runs `npm audit`, the type check and the build on every PR, and deploys on `main`.
`.github/workflows/lighthouse.yml` checks that every Lighthouse category stays ≥ 95 on PRs.

### Custom domain (later)

1. Buy the domain, then add `public/CNAME` containing only the domain (e.g. `lucabissoli.dev`).
2. DNS: for an apex domain, four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (and the matching `AAAA` records); for `www`, a `CNAME` to `bissochan.github.io`.
3. Settings → Pages → Custom domain, then tick **Enforce HTTPS**.
4. Update `SITE_URL` (repo variable and `.env`) and the `Canonical` line in `public/.well-known/security.txt`.

## Adding shadcn/ui components

The shadcn CLI is not a dependency (it pulled in vulnerable packages); run it on demand:

```bash
npx shadcn@latest add tooltip
```

Its base styles are vendored in `src/styles/shadcn.css`.
