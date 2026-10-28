# Varunreddy Guvvala — Professional Portfolio

An original, responsive portfolio for a Senior Python AI Engineer. Built with React, Vite, Tailwind CSS, Lucide, and Motion. The AI engineering fieldbook design uses graphite surfaces, lime accents, oversized self-hosted DM Sans typography, a technical index rail, and an interactive retrieval-to-production walkthrough. Selected work leads the page through large case-study panels and industry filters.

## Run locally

Use Node.js 24 LTS (minimum supported version: 22.12).

```sh
npm ci
npm run dev
```

Open **http://localhost:5173/my-portfolio/** in your browser. On a remote development machine, forward port **5173** in your editor and append `/my-portfolio/` to its forwarded address. A loopback URL on your own computer cannot reach a remote machine without forwarding.

To inspect the production bundle:

```sh
npm run build
npm run preview
```

Open **http://localhost:4173/my-portfolio/** (or forward remote port 4173).

## Validation

```sh
npm run lint
npm run build
npx playwright install --with-deps chromium
npm test
```

Where Chromium is already installed, skip the browser download and run:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm test
```

The 14 Playwright checks run across desktop and mobile Chromium. They cover resume content, assets, JavaScript errors, navigation, architecture controls, industry filters, timeline disclosures, case-study dialogs, keyboard focus, links, overflow at 320/390/768/1024/1440px, and automated WCAG A/AA accessibility checks for the page and modal. Automated accessibility checks supplement manual review; they do not establish complete accessibility conformance. External email delivery and LinkedIn availability are not tested.

## Review before publication

The site is intentionally not deployed automatically when code is pushed or merged. Review the design and content locally first. The resume document is not in the repository or public assets. There is no resume download. GitHub profile links are omitted at the owner's request. No certifications or unsupported standalone projects are invented.

Selected work is labeled as **client engagements**, not open-source repositories. Titles summarize work described in the resume. Client source code and internal materials are not included. Metrics reproduce resume claims and are attributed to the corresponding clients.

See [content decisions](docs/content-source.md) for resume extraction and editorial notes.

## Deploy to GitHub Pages after approval

The Vite base is already `/my-portfolio/` for this repository. No backend, database, credentials, environment variables, or paid hosting is required.

1. Push the reviewed changes to `VARUNREDDYGUVVALA/my-portfolio` and merge the portfolio pull request into `main`.
2. In the repository, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. This requires repository administration access. GitHub Actions must be enabled for the repository.
3. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**. Choose `main` and run it only after approving the design.
4. The workflow installs locked dependencies, runs lint and the production build, uploads `dist`, and deploys through GitHub's Pages action. Approve the `github-pages` environment if your repository has a protection rule.
5. After the workflow succeeds, visit **https://varunreddyguvvala.github.io/my-portfolio/**. Verify navigation, assets, case-study dialogs, and contact links on the public site.

The deploy job has `pages: write` and `id-token: write`; builds have read-only repository access. No personal access token is needed in the workflow. GitHub Pages availability depends on repository visibility and account plan (public repositories can use free Pages hosting).

If GitHub API access is unavailable in your development environment, create the PR manually from the pushed feature branch using GitHub's **Compare & pull request** button. Creating a PR requires repository write access or a fork; changing Pages settings requires administration access. The expected public URL above is not a claim that deployment has happened.

If the owner or repository name changes, update `base` in `vite.config.js`, canonical/Open Graph URLs in `index.html`, and `public/robots.txt` / `public/sitemap.xml` together.

## Project structure

- `src/App.jsx`: page sections, shared heading/tags/reveal components, architecture interaction, and accessible case-study dialog.
- `src/data.js`: resume-derived experience, skill categories, case studies, and contact information.
- `src/index.css`: Tailwind integration, design tokens, responsive layouts, and reduced-motion support.
- `public/`: favicon, social image, crawler instructions, and sitemap; no resume document.
- `tests/`: browser behavior and accessibility checks.
- `.github/workflows/deploy.yml`: manual deployment after review.

All fonts are bundled locally through Fontsource; the running site makes no external font, analytics, or API requests. Contact links open the user's email application or LinkedIn. The clipboard button reports success or a manual-copy fallback without requiring a backend.
