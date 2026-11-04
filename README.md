# Varunreddy Guvvala — Professional Portfolio

**AI ORBIT** is an original, static portfolio for Varunreddy Guvvala, Senior Python AI/ML Engineer, based on the latest user-supplied AWS resume. Built with React, Vite, Tailwind CSS, Lucide, Motion, and a self-contained Canvas globe renderer.

Two complementary experiences:

- **Command mode:** a skippable two-second initialization, an interactive rotating 3D point-cloud Earth, four orbital technology layers, selectable engineering workstreams, inspectable architecture mode, a project universe, an MCP request walkthrough, a connected technology constellation, a local terminal, and contact links.
- **Recruiter mode / Open profile:** the complete resume as an editorial Career Atlas. Full view is the default: all 15 professional-summary statements, 10 skill categories, 82 responsibilities, five complete technology environments, education, and the resume contact information. A sticky index, client milestones, optional quick scan, searchable skills, and print styling make the complete document navigable. There is no resume file download.

The intro is remembered for the session; the viewing mode is saved locally. Motion can be paused and reduced-motion preferences bypass the intro and disable visual movement. Recruiter mode unmounts the globe. The globe uses local coastline polygons and mathematical 3D projection: no WebGL requirement, remote Earth texture, external map API, model API, analytics, backend, or credentials. A static globe fallback retains technology navigation if Canvas is unavailable.

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

The 42 Playwright checks run across desktop and mobile Chromium. They cover intro completion/skip/session behavior, actual Canvas rendering, missing assets and runtime errors, system selection, globe shortcuts, architecture inspection, modal focus/return, constellation connections, MCP request progression, terminal commands/history/unknown input/reset, recruiter-mode persistence, the absence of resume downloads, navigation, contact destinations, visual motion pause, reduced-motion preferences, Canvas fallback, and layout at 320/390/768/1024/1440/1920px. Additional recruiter checks verify every source statement, full/quick reading controls, per-role expansion, skill search, index navigation, complete print layout, and restoring filtered content before printing. Automated WCAG A/AA checks run against command mode, recruiter mode, and the architecture dialog. Automated checks supplement manual review; they do not establish complete accessibility conformance. External email delivery and LinkedIn availability are not tested.

## Review before publication

The site is intentionally not deployed automatically when code is pushed or merged. Review the design and content locally first. The latest instruction removes resume downloads. No resume document is included in public assets, profile links, or terminal commands. The GitHub link points to this portfolio's known source repository; no personal GitHub profile is invented. No certifications or unsupported technologies, employers, or projects are added.

Selected work is labeled as **client engagements**, not open-source repositories. Titles summarize work described in the resume. Client source code and internal materials are not included. Metrics reproduce resume claims and are attributed to the corresponding clients. The additional agent-orchestration selector is a workstream within the Cigna engagement, and the data selector summarizes San Bernardino County work; they are not invented additional projects. Globe arcs, waveforms, particles, and request traces are illustrative, not live production telemetry or geographic deployment claims. The AI CORE status describes this portfolio interface only.

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

- `src/App.jsx`: mode/intro preferences, navigation, motion controls, modal coordination, experience, and contact.
- `src/data.js`: concise command-mode content and conceptual architecture nodes.
- `src/resume.json`: complete structured content extracted from the latest AWS Word resume (all source summary, skills, responsibility, environment, identity, and education content).
- `src/resume-atlas.css`: the recruiter view’s paper/ink/copper visual identity, responsive editorial layout, reading controls, and complete print styling.
- `src/orbitData.js`: orbital layers, workstream selectors, resume/repository URLs, and technology relationships.
- `src/components/GlobeScene.jsx`: local coastline data, 3D projection, orbital geometry, particles, Canvas fallback, and cleanup of render/resize/visibility observers.
- `src/components/`: command center, project universe, architecture lab, MCP explorer, constellation, terminal, profile, shared UI, and accessible dialogs.
- `src/index.css`: design tokens, command/recruiter layouts, responsive rules, motion controls, and print styling.
- `public/`: favicon, social image, crawler metadata, sitemap, with no resume document.
- `tests/`: browser behavior, privacy/content checks, resource checks, and accessibility checks.
- `.github/workflows/deploy.yml`: manual Pages deployment after review, using the correct `/my-portfolio/` Vite base.

Fonts are bundled locally. The terminal is a fixed command interpreter: it never runs shell commands, evaluates input, or calls external APIs. Print profile uses the browser's print dialog. Orbit labels, architecture components, and constellation technologies are keyboard-operable buttons.
