import { readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
const fullResume = JSON.parse(
  readFileSync(new URL('../src/resume.json', import.meta.url), 'utf8'),
)
const cases = [
  'Healthcare knowledge & agent platform',
  'Financial risk & MLOps platform',
  'Retail recommendation & forecasting',
]
test.beforeEach(async ({ page }, info) => {
  if (!info.title.includes('intro'))
    await page.addInitScript(() =>
      sessionStorage.setItem('ai-orbit-entered', 'true'),
    )
})

test('intro can be skipped immediately and is not replayed in the session', async ({
  page,
}) => {
  await page.goto('')
  const intro = page.getByRole('dialog', { name: 'AI ORBIT introduction' })
  await expect(intro).toBeVisible()
  await intro.getByRole('button', { name: 'Skip intro' }).click()
  await expect(intro).toHaveCount(0)
  await expect(page.locator('#main')).toBeFocused()
  await page.reload()
  await expect(intro).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'VARUNREDDY',
  )
})
test('intro completes its short initialization and offers recruiter bypass', async ({
  page,
}) => {
  await page.goto('')
  const intro = page.getByRole('dialog', { name: 'AI ORBIT introduction' })
  await expect(
    intro.getByText('INTERFACE ONLINE', { exact: true }),
  ).toBeVisible({ timeout: 6000 })
  await expect(intro).toContainText(
    'No production systems are being connected.',
  )
  await intro.getByRole('button', { name: 'Recruiter view' }).click()
  await expect(page.locator('.recruiter-profile')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Varunreddy Guvvala',
  )
})
test('command center renders the resume, a real globe canvas, and valid assets without errors', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`)
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  await expect(page).toHaveTitle(
    'AI ORBIT | Varunreddy Guvvala — Senior Python AI/ML Engineer',
  )
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'VARUNREDDY',
  )
  await expect(page.locator('#home')).toContainText(
    'Senior Python AI/ML Engineer',
  )
  await expect
    .poll(() =>
      page.locator('canvas').evaluate((c) => {
        const data = c
          .getContext('2d')
          .getImageData(0, 0, c.width, c.height).data
        let painted = 0
        for (let i = 3; i < data.length; i += 4) if (data[i] > 10) painted++
        return painted
      }),
    )
    .toBeGreaterThan(1000)
  for (const id of [
    'projects',
    'agents',
    'skills',
    'experience',
    'education',
    'terminal',
    'contact',
  ])
    await expect(page.locator(`#${id}`)).toHaveCount(1)
  for (const asset of [
    'favicon.svg',
    'social-card.png',
    'robots.txt',
    'sitemap.xml',
  ])
    expect((await page.request.get(asset)).ok()).toBeTruthy()
  const source = await page.locator('main').innerText()
  for (const unsupported of [
    'CrewAI',
    'AutoGen',
    'Snowflake',
    'Databricks',
    'FAISS',
    'Pinecone',
    'Weaviate',
    'Evernorth',
    'effective-date',
  ])
    expect(source).not.toContain(unsupported)
  expect(errors).toEqual([])
})
test('engineering system selection updates stack, globe description, and conceptual flow', async ({
  page,
}) => {
  await page.goto('')
  const group = page.getByRole('group', { name: 'Select engineering system' })
  await group.getByRole('button', { name: /Banking ML platform/ }).click()
  await expect(
    group.getByRole('button', { name: /Banking ML platform/ }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.active-stack')).toContainText('Azure ML')
  await expect(page.locator('.flow-strip')).toContainText('XGBoost')
  await expect(
    page.getByRole('img', { name: /Rotating 3D globe/ }),
  ).toHaveAttribute('aria-label', /Banking ML platform/)
  await group.getByRole('button', { name: /Enterprise data workflows/ }).click()
  await expect(page.locator('.active-stack')).toContainText('Airflow')
  await expect(page.locator('.system-footer')).toContainText(
    'San Bernardino County',
  )
})
test('globe shortcuts open architecture mode, inspect nodes, and switch contexts', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  const shortcuts = page.getByRole('group', {
    name: 'Navigate architecture from globe',
  })
  await shortcuts.getByRole('button', { name: 'RAG', exact: true }).click()
  const lab = page.getByRole('dialog', { name: 'Architecture mode' })
  await expect(lab).toBeVisible()
  await lab.getByRole('button', { name: /03.*OpenSearch/ }).click()
  await expect(lab.locator('.node-detail')).toContainText('metadata filters')
  await lab
    .getByRole('group', { name: 'Select architecture context' })
    .getByRole('button', { name: 'Banking ML platform', exact: true })
    .click()
  await expect(
    lab.getByRole('group', { name: 'banking architecture components' }),
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(lab).toHaveCount(0)
  await expect(
    shortcuts.getByRole('button', { name: 'RAG', exact: true }),
  ).toBeFocused()
  await page.getByRole('button', { name: 'Explore MCP', exact: true }).click()
  await expect(lab).toBeVisible()
  await expect(
    lab.getByRole('heading', { name: 'Governed agent orchestration' }),
  ).toBeVisible()
  await lab.getByRole('button', { name: 'Close Architecture mode' }).click()
})
test('technology constellation connects nodes to related work', async ({
  page,
}) => {
  await page.goto('')
  const constellation = page.locator('.constellation-map')
  await constellation
    .getByRole('button', { name: 'LangGraph', exact: true })
    .focus()
  await expect(page.locator('.technology-inspector')).toContainText(
    'Cigna Healthcare',
  )
  await expect(
    constellation.getByRole('button', { name: 'MCP', exact: true }),
  ).toHaveClass(/is-related/)
  await constellation
    .getByRole('button', { name: 'MLflow', exact: true })
    .click()
  await expect(page.locator('.technology-inspector')).toContainText(
    'Regions Bank',
  )
  await page
    .locator('.related-work')
    .getByRole('button', { name: /Regions Bank/ })
    .click()
  await expect(
    page.getByRole('dialog', { name: 'Architecture mode' }),
  ).toBeVisible()
})
test('MCP explorer selects responsibilities and tools and traces a local request', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  const agents = page.getByRole('group', {
    name: 'Explore agent responsibilities',
  })
  await agents.getByRole('button', { name: /Response validation/ }).click()
  await page
    .getByRole('group', { name: 'Explore connected tools' })
    .getByRole('button', { name: 'Database', exact: true })
    .click()
  await expect(page.locator('.mcp-trace-heading')).toContainText(
    'Response validation → Database',
  )
  await page.getByRole('button', { name: 'Trace a request' }).click()
  await expect(page.locator('.trace-announcement')).toContainText(
    'Walkthrough complete',
  )
  await expect(page.locator('.request-path .is-current')).toContainText(
    'Grounded response',
  )
  await expect(page.locator('.trace-announcement')).toContainText(
    'not a real healthcare request',
  )
})
test('terminal supports commands, history, unknown input, clear, and no resume download', async ({
  page,
}) => {
  await page.goto('')
  const input = page.getByRole('textbox', { name: 'AI-ORBIT >' })
  await input.fill('help')
  await input.press('Enter')
  await expect(page.getByRole('log')).toContainText(
    'architecture · agentic-ai · rag',
  )
  await input.fill('rag')
  await input.press('Enter')
  await expect(page.getByRole('log')).toContainText('hybrid retrieval')
  await input.press('ArrowUp')
  await expect(input).toHaveValue('rag')
  await input.fill('<script>bad()</script>')
  await input.press('Enter')
  await expect(page.getByRole('log')).toContainText(
    'Unknown command: <script>bad()</script>',
  )
  await input.fill('resume')
  await input.press('Enter')
  await expect(page.getByRole('log')).toContainText('Unknown command: resume')
  await expect(page.locator('a[download]')).toHaveCount(0)
  await input.fill('clear')
  await input.press('Enter')
  await expect(page.getByRole('log')).toBeEmpty()
})
test('recruiter mode shows the complete profile, persists, and excludes resume downloads', async ({
  page,
}) => {
  await page.goto('')
  await page
    .getByRole('group', { name: 'Portfolio viewing mode' })
    .getByRole('button', { name: 'Recruiter mode', exact: true })
    .click()
  await expect(page.locator('.recruiter-profile')).toBeVisible()
  await expect(page.locator('canvas')).toHaveCount(0)
  for (const name of [
    'Cigna Healthcare',
    'Regions Bank',
    'San Bernardino County',
    'Publix',
    'Fortis Healthcare',
  ])
    await expect(
      page
        .locator('.profile-experience')
        .getByRole('heading', { name, exact: true }),
    ).toBeVisible()
  await expect(page.locator('.profile-education')).toContainText(
    'Parul University',
  )
  await expect(
    page.locator('a[download], a[href$=".docx"], a[href$=".pdf"]'),
  ).toHaveCount(0)
  const file = await page.request.get(
    'resume/Varunreddy-Guvvala-AWS-Resume.docx',
  )
  expect((await file.body()).subarray(0, 2).toString()).not.toBe('PK')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'recruiter')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Varunreddy Guvvala',
  )
  await page
    .getByRole('group', { name: 'Portfolio viewing mode' })
    .getByRole('button', { name: 'Command mode', exact: true })
    .click()
  await expect(page.locator('canvas')).toHaveCount(1)
})
test('navigation, internal anchors, contact links, and experience disclosures work', async ({
  page,
  isMobile,
}) => {
  await page.goto('')
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page.keyboard.press('Escape')
    await expect(
      page.getByRole('button', { name: 'Open navigation' }),
    ).toBeFocused()
    await page.getByRole('button', { name: 'Open navigation' }).click()
  }
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Experience', exact: true })
    .click()
  await expect(page).toHaveURL(/#experience$/)
  const detail = page.locator('#experience details').first()
  await detail.locator('summary').click()
  await expect(detail.getByText(/Engineered a RAG platform/)).toBeVisible()
  expect(
    await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((a) => a.getAttribute('href'))
          .filter((h) => !document.getElementById(h.slice(1))),
      ),
  ).toEqual([])
  await expect(
    page.getByRole('link', { name: 'Say hello', exact: true }),
  ).toHaveAttribute('href', 'mailto:guvvalavarunreddy2103@gmail.com')
  await expect(
    page.getByRole('link', { name: 'Connect on LinkedIn' }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/varunreddy-guvvala/')
  await expect(
    page.getByRole('link', { name: 'Explore repository' }),
  ).toHaveAttribute('href', 'https://github.com/VARUNREDDYGUVVALA/my-portfolio')
})
test('visual motion can pause and reduced-motion preferences are honored', async ({
  page,
}) => {
  await page.goto('')
  await page.getByRole('button', { name: 'Pause all visual motion' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused')
  await page.waitForTimeout(80)
  const transform = await page
    .getByRole('button', { name: 'Explore Claude', exact: true })
    .evaluate((e) => e.style.transform)
  await page.waitForTimeout(160)
  expect(
    await page
      .getByRole('button', { name: 'Explore Claude', exact: true })
      .evaluate((e) => e.style.transform),
  ).toBe(transform)
  await page.getByRole('button', { name: 'Resume all visual motion' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'running')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  await expect(
    page.getByRole('dialog', { name: 'AI ORBIT introduction' }),
  ).toHaveCount(0)
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused')
  await expect(
    page.getByRole('button', { name: 'Reduced motion enabled' }),
  ).toBeDisabled()
})
test('command and recruiter layouts fit mobile through desktop', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  for (const mode of ['command', 'recruiter']) {
    if (mode === 'recruiter')
      await page
        .getByRole('button', { name: 'Recruiter mode', exact: true })
        .click()
    for (const width of [320, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 })
      await page.locator('footer').scrollIntoViewIfNeeded()
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${mode} overflow at ${width}px`,
      ).toBeTruthy()
    }
  }
})
test('accessibility checks pass for command mode, recruiter mode, and architecture dialog', async ({
  page,
}) => {
  test.setTimeout(90000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  for (const id of [
    'projects',
    'agents',
    'skills',
    'experience',
    'terminal',
    'contact',
  ])
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
  let result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(result.violations).toEqual([])
  await page
    .getByRole('group', { name: 'Navigate architecture from globe' })
    .getByRole('button', { name: 'RAG', exact: true })
    .click()
  result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(result.violations).toEqual([])
  await page.keyboard.press('Escape')
  await page
    .getByRole('button', { name: 'Recruiter mode', exact: true })
    .click()
  result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(result.violations).toEqual([])
})
test('globe has a usable static fallback when canvas is unavailable', async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = function () {
      return null
    }
  })
  await page.goto('')
  await expect(page.locator('.globe-fallback')).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Explore MCP', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Explore MCP', exact: true }).click()
  await expect(
    page.getByRole('dialog', { name: 'Architecture mode' }),
  ).toBeVisible()
})
test('case studies trap focus, close with Escape, and restore the trigger', async ({
  page,
}) => {
  await page.goto('')
  for (const name of cases) {
    const trigger = page.getByRole('button', {
      name: `Read case study: ${name}`,
      exact: true,
    })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog.getByRole('heading', { name })).toBeVisible()
    await page.keyboard.press('Tab')
    expect(
      await page.evaluate(() => !!document.activeElement.closest('dialog')),
    ).toBeTruthy()
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
  }
})
test('AI core status explains its scope and opens the professional profile', async ({
  page,
}) => {
  await page.goto('')
  await page
    .getByRole('button', { name: 'Open AI core system profile' })
    .click()
  const dialog = page.getByRole('dialog', { name: 'AI core system profile' })
  await expect(dialog).toContainText(
    'not the availability of any client production systems',
  )
  await dialog
    .getByRole('button', { name: 'Open professional profile' })
    .click()
  await expect(page.locator('.recruiter-profile')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
})

async function openRecruiter(page) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  await page
    .getByRole('button', { name: 'Recruiter mode', exact: true })
    .click()
}
test('full resume retains every source summary, skill category, responsibility, and environment', async ({
  page,
}) => {
  await openRecruiter(page)
  const view = page.locator('.resume-atlas')
  await expect(
    view.getByRole('button', { name: 'Full resume', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(view.locator('.atlas-summary-grid li:visible')).toHaveCount(15)
  await expect(view.locator('.atlas-full-skills article')).toHaveCount(10)
  await expect(
    view.locator('.atlas-responsibilities > li:visible'),
  ).toHaveCount(82)
  await expect(view.locator('.atlas-environment')).toHaveCount(5)
  const text = (await view.innerText()).replace(/\s+/g, ' ')
  for (const point of fullResume.summary)
    expect(text).toContain(point.replace(/\s+/g, ' '))
  for (const category of fullResume.skills) {
    expect(text).toContain(category.category)
    expect(text).toContain(category.content.replace(/\s+/g, ' '))
  }
  for (const job of fullResume.experience) {
    expect(text).toContain(job.role)
    for (const point of job.responsibilities)
      expect(text).toContain(point.replace(/\s+/g, ' '))
    expect(text).toContain(job.environment.replace(/\s+/g, ' '))
  }
  await expect(
    view.getByRole('link', {
      name: new RegExp(
        fullResume.contact.phone.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      ),
    }),
  ).toHaveAttribute('href', 'tel:+19196751151')
  await expect(view.locator('a[download], a[href$=".docx"]')).toHaveCount(0)
})
test('quick scan is optional and full reading restores all contributions', async ({
  page,
}) => {
  await openRecruiter(page)
  const view = page.locator('.resume-atlas')
  await view.getByRole('button', { name: 'Quick scan', exact: true }).click()
  await expect(
    view.locator('.atlas-responsibilities > li:visible'),
  ).toHaveCount(15)
  const first = view.locator('.atlas-job').first()
  await first.getByRole('button', { name: 'Show all 19 contributions' }).click()
  await expect(
    first.locator('.atlas-responsibilities > li:visible'),
  ).toHaveCount(19)
  await view.getByRole('button', { name: 'Full resume', exact: true }).click()
  await expect(
    view.locator('.atlas-responsibilities > li:visible'),
  ).toHaveCount(82)
  await expect(view.locator('.atlas-summary-grid li:visible')).toHaveCount(15)
})
test('complete skills can be searched and the resume index navigates to sections', async ({
  page,
}) => {
  await openRecruiter(page)
  const search = page.getByRole('searchbox', { name: /Find a technology/ })
  await search.fill('SageMaker')
  await expect(page.locator('.atlas-full-skills article')).toHaveCount(1)
  await expect(page.locator('.atlas-full-skills')).toContainText(
    'Cloud Platforms & Services',
  )
  await search.fill('no-such-skill-123')
  await expect(page.getByText('No matching skill categories.')).toBeVisible()
  await page.getByRole('button', { name: 'Show all categories' }).click()
  await expect(page.locator('.atlas-full-skills article')).toHaveCount(10)
  await page
    .getByRole('navigation', { name: 'Resume section index' })
    .getByRole('link', { name: /Professional summary/ })
    .click()
  await expect(page).toHaveURL(/#resume-summary$/)
  await page
    .getByRole('navigation', { name: 'Jump to client engagement' })
    .getByRole('link', { name: /Fortis Healthcare/ })
    .click()
  await expect(page).toHaveURL(/#resume-job-4$/)
})
test('print layout retains the complete resume even when quick scan was selected', async ({
  page,
}) => {
  await openRecruiter(page)
  await page.getByRole('button', { name: 'Quick scan', exact: true }).click()
  await expect(
    page.locator('.atlas-responsibilities > li:visible'),
  ).toHaveCount(15)
  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' })
  await expect(
    page.locator('.atlas-responsibilities > li:visible'),
  ).toHaveCount(82)
  await expect(page.locator('.atlas-summary-grid li:visible')).toHaveCount(15)
  await expect(page.locator('a[download]')).toHaveCount(0)
})

test('print action restores all content after filtering and quick scan', async ({
  page,
}) => {
  await openRecruiter(page)
  await page.evaluate(() => {
    window.print = () => {
      window.__profilePrinted = true
    }
  })
  await page.getByRole('button', { name: 'Quick scan', exact: true }).click()
  await page
    .getByRole('searchbox', { name: /Find a technology/ })
    .fill('SageMaker')
  await expect(page.locator('.atlas-full-skills article')).toHaveCount(1)
  await page.getByRole('button', { name: 'Print profile', exact: true }).click()
  await expect(page.locator('.resume-atlas')).toHaveAttribute(
    'data-detail',
    'full',
  )
  await expect(page.locator('.atlas-full-skills article')).toHaveCount(10)
  await expect(
    page.locator('.atlas-responsibilities > li:visible'),
  ).toHaveCount(82)
  await expect
    .poll(() => page.evaluate(() => window.__profilePrinted))
    .toBeTruthy()
})

test('recruiter themes preserve the full resume and persist the selected appearance', async ({
  page,
}) => {
  await openRecruiter(page)
  const select = page.getByRole('combobox', { name: 'Recruiter theme' })
  await expect(select).toHaveValue('aurora')
  for (const theme of ['minimal', 'editorial', 'aurora']) {
    await select.selectOption(theme)
    await expect(page.locator('html')).toHaveAttribute(
      'data-recruiter-theme',
      theme,
    )
    await expect(
      page.locator('.atlas-responsibilities > li:visible'),
    ).toHaveCount(82)
    await expect(page.locator('.atlas-full-skills article')).toHaveCount(10)
    await expect(page.locator('a[download], a[href$=".docx"]')).toHaveCount(0)
  }
  await select.selectOption('minimal')
  await page.reload()
  await expect(
    page.getByRole('combobox', { name: 'Recruiter theme' }),
  ).toHaveValue('minimal')
  await expect(page.locator('html')).toHaveAttribute(
    'data-recruiter-theme',
    'minimal',
  )
})
test('all recruiter theme palettes meet automated WCAG AA checks', async ({
  page,
}) => {
  test.setTimeout(90000)
  await openRecruiter(page)
  for (const theme of ['aurora', 'minimal', 'editorial']) {
    await page
      .getByRole('combobox', { name: 'Recruiter theme' })
      .selectOption(theme)
    await expect(page.locator('html')).toHaveAttribute(
      'data-recruiter-theme',
      theme,
    )
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(
      result.violations,
      `${theme} theme contrast and accessibility`,
    ).toEqual([])
  }
})
test('aurora atmosphere can pause and follows reduced-motion preferences', async ({
  page,
}) => {
  await page.goto('')
  await page
    .getByRole('button', { name: 'Recruiter mode', exact: true })
    .click()
  await expect(page.locator('html')).toHaveAttribute(
    'data-recruiter-theme',
    'aurora',
  )
  expect(
    await page
      .locator('.atlas-hero')
      .evaluate((el) => getComputedStyle(el, '::before').animationName),
  ).toBe('atlas-aurora-drift')
  await page.getByRole('button', { name: 'Pause atmosphere' }).click()
  await expect(page.locator('.resume-atlas')).toHaveAttribute(
    'data-atmosphere',
    'paused',
  )
  expect(
    await page
      .locator('.atlas-hero')
      .evaluate((el) => getComputedStyle(el, '::before').animationPlayState),
  ).toBe('paused')
  await page.getByRole('button', { name: 'Resume atmosphere' }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(
    await page
      .locator('.atlas-hero')
      .evaluate((el) => getComputedStyle(el, '::before').animationName),
  ).toBe('none')
})
test('resume reading progress responds to actual scrolling', async ({
  page,
}) => {
  await openRecruiter(page)
  const progress = page.getByRole('progressbar', {
    name: 'Resume reading progress',
  })
  await expect(progress).toHaveAttribute('value', '0')
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
  await expect(progress).toHaveAttribute('value', '100')
  await page.evaluate(() => scrollTo(0, 0))
  await expect(progress).toHaveAttribute('value', '0')
})

test('recruiter portrait loads and orbital motion can pause', async ({
  page,
}) => {
  await page.goto('')
  await page
    .getByRole('button', { name: 'Recruiter mode', exact: true })
    .click()
  const portrait = page.getByRole('img', {
    name: 'Varunreddy Guvvala',
    exact: true,
  })
  await expect(portrait).toBeVisible()
  await expect
    .poll(() =>
      portrait.evaluate((image) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true)
  await page.getByLabel('Recruiter theme').selectOption('aurora')
  await page.getByRole('button', { name: 'Pause atmosphere' }).click()
  await expect(page.locator('.atlas-portrait-orbits i').last()).toHaveCSS(
    'animation-play-state',
    'paused',
  )
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.atlas-portrait-orbits i').last()).toHaveCSS(
    'animation-name',
    'none',
  )
})
