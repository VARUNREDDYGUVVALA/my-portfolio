import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const titles = [
  'Healthcare knowledge & agent platform',
  'Financial risk & MLOps platform',
  'Retail recommendation & forecasting',
]

test('latest resume identity, experience, sections, and assets render without runtime errors', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`)
  })
  await page.goto('')
  await expect(page).toHaveTitle(
    'Varunreddy Guvvala | Senior Python AI/ML Engineer',
  )
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Intelligence out.',
  )
  await expect(page.locator('#home')).toContainText(
    'SENIOR PYTHON AI/ML ENGINEER',
  )
  for (const id of [
    'about',
    'projects',
    'approach',
    'skills',
    'experience',
    'education',
    'contact',
  ])
    await expect(page.locator(`#${id}`)).toHaveCount(1)
  for (const company of [
    'Cigna Healthcare',
    'Regions Bank',
    'San Bernardino County',
    'Publix',
    'Fortis Healthcare',
  ])
    await expect(
      page
        .locator('#experience')
        .getByRole('heading', { name: company, exact: true }),
    ).toBeAttached()
  await expect(page.locator('#experience .job-role').first()).toHaveText(
    'Senior Python AI/ML Engineer',
  )
  await expect(
    page.getByRole('heading', { name: 'Bachelor of Technology' }),
  ).toBeAttached()
  await expect(
    page.locator('a[download], a[href*="github.com"], a[href$=".docx"]'),
  ).toHaveCount(0)
  for (const asset of [
    'favicon.svg',
    'social-card.png',
    'robots.txt',
    'sitemap.xml',
  ])
    expect((await page.request.get(asset)).ok()).toBeTruthy()
  expect(errors).toEqual([])
})
test('navigation, mobile menu Escape, and experience disclosures work', async ({
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
  if (isMobile)
    await expect(
      page.getByRole('button', { name: 'Open navigation' }),
    ).toHaveAttribute('aria-expanded', 'false')
  const disclosure = page.locator('#experience details').first()
  await disclosure.locator('summary').click()
  await expect(disclosure.getByText(/Engineered a RAG platform/)).toBeVisible()
  await expect(disclosure).toHaveAttribute('open', '')
})
test('blueprint components expose relevant detail and selected state', async ({
  page,
}) => {
  await page.goto('')
  const hero = page.locator('#home')
  const group = hero.getByRole('group', {
    name: 'healthcare architecture components',
  })
  await group.getByRole('button', { name: /Bedrock \/ Claude/ }).click()
  await expect(hero.locator('.node-detail')).toContainText(
    'Claude models on Amazon Bedrock',
  )
  await expect(
    group.getByRole('button', { name: /Bedrock \/ Claude/ }),
  ).toHaveAttribute('aria-pressed', 'true')
  await group.getByRole('button', { name: /Validation & review/ }).click()
  await expect(hero.locator('.node-detail')).toContainText(
    'not a claim of using the Amazon Bedrock Guardrails product',
  )
})
test('domain tabs support mouse, keyboard navigation, and matching architecture', async ({
  page,
}) => {
  await page.goto('')
  const tabs = page.getByRole('tablist', { name: 'Project domains' })
  await tabs.getByRole('tab', { name: /Banking/ }).click()
  let panel = page.getByRole('tabpanel')
  await expect(
    panel.getByRole('heading', {
      name: 'From risk signals to reliable decisions.',
    }),
  ).toBeVisible()
  await expect(
    panel.getByRole('group', { name: 'banking architecture components' }),
  ).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(tabs.getByRole('tab', { name: /Retail/ })).toBeFocused()
  await expect(page.getByRole('tabpanel')).toContainText('Publix')
  await page.keyboard.press('Home')
  await expect(tabs.getByRole('tab', { name: /Healthcare/ })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await page.keyboard.press('End')
  await expect(tabs.getByRole('tab', { name: /Retail/ })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(
    page
      .getByRole('tabpanel')
      .getByRole('group', { name: 'retail architecture components' }),
  ).toBeVisible()
})
test('agent trace advances through human review and restarts', async ({
  page,
}) => {
  await page.goto('')
  const trace = page.locator('.trace-viewer')
  await expect(trace).toContainText('ILLUSTRATIVE · NOT A LIVE AGENT')
  await trace.getByRole('button', { name: 'Next step' }).click()
  await expect(
    trace.getByRole('heading', { name: 'Give agents governed capabilities.' }),
  ).toBeVisible()
  await trace.getByRole('button', { name: 'Next step' }).click()
  await expect(
    trace.getByRole('heading', { name: 'Keep a person in the decision loop.' }),
  ).toBeVisible()
  await trace.getByRole('button', { name: 'Next step' }).click()
  await expect(
    trace.getByRole('heading', { name: 'Deliver. Evaluate. Observe.' }),
  ).toBeVisible()
  await trace.getByRole('button', { name: 'Restart walkthrough' }).click()
  await expect(
    trace.getByRole('heading', { name: 'Understand before acting.' }),
  ).toBeVisible()
})
test('capability explorer reveals technologies without proficiency claims', async ({
  page,
}) => {
  await page.goto('')
  const group = page.getByRole('group', {
    name: 'Explore technical capabilities',
  })
  await group.getByRole('button', { name: /Cloud & production/ }).click()
  await expect(page.locator('.capability-detail')).toContainText(
    'CloudWatch / X-Ray',
  )
  await group.getByRole('button', { name: /Generative & agentic AI/ }).click()
  await expect(page.locator('.capability-detail')).toContainText('Claude')
  await expect(page.locator('.capability-map')).toContainText(
    'not proficiency scores',
  )
})
test('project register filters, searches, handles no results, and resets', async ({
  page,
}) => {
  await page.goto('')
  const register = page.locator('.project-register')
  await register.getByLabel('Domain').selectOption('Banking')
  await expect(
    register.getByRole('button', { name: /Read case study:/ }),
  ).toHaveCount(1)
  await expect(
    register.getByRole('button', { name: `Read case study: ${titles[1]}` }),
  ).toBeVisible()
  await register.getByLabel('Search').fill('nonexistent-test-project')
  await expect(
    register.getByText('No case studies match these filters.'),
  ).toBeVisible()
  await register.getByRole('button', { name: 'Reset filters' }).click()
  await expect(
    register.getByRole('button', { name: /Read case study:/ }),
  ).toHaveCount(3)
  await register.getByLabel('Search').fill('bedrock')
  await expect(
    register.getByRole('button', { name: `Read case study: ${titles[0]}` }),
  ).toBeVisible()
  await expect(
    register.getByRole('button', { name: /Read case study:/ }),
  ).toHaveCount(1)
})
test('all case studies open, trap focus, close, and restore focus', async ({
  page,
}) => {
  await page.goto('')
  for (const title of titles) {
    const trigger = page.getByRole('button', {
      name: `Read case study: ${title}`,
      exact: true,
    })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog.getByRole('heading', { name: title })).toBeVisible()
    await expect(
      dialog.getByRole('heading', { name: 'The outcome' }),
    ).toBeVisible()
    await page.keyboard.press('Tab')
    expect(
      await page.evaluate(() => !!document.activeElement.closest('dialog')),
    ).toBeTruthy()
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
  }
})
test('theme selection persists and both modes retain readable layout', async ({
  page,
}) => {
  await page.goto('')
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})
test('contact links and anchors are valid and layout fits mobile through desktop', async ({
  page,
}) => {
  await page.goto('')
  await expect(page.getByRole('link', { name: 'Say hello' })).toHaveAttribute(
    'href',
    'mailto:guvvalavarunreddy2103@gmail.com',
  )
  await expect(
    page.getByRole('link', { name: /Connect on LinkedIn/ }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/varunreddy-guvvala/')
  expect(
    await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((a) => a.getAttribute('href'))
          .filter((href) => !document.getElementById(href.slice(1))),
      ),
  ).toEqual([])
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.locator('#projects').scrollIntoViewIfNeeded()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBeTruthy()
  }
})
test('automated WCAG AA checks pass in both themes and case-study dialog', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  for (const theme of ['dark', 'light']) {
    if (theme === 'light')
      await page.getByRole('button', { name: 'Switch to light theme' }).click()
    for (const id of [
      'projects',
      'about',
      'approach',
      'skills',
      'experience',
      'education',
      'contact',
    ])
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    await page.waitForTimeout(450)
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(result.violations).toEqual([])
  }
  await page
    .getByRole('button', { name: `Read case study: ${titles[0]}`, exact: true })
    .click()
  const modal = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(modal.violations).toEqual([])
})
