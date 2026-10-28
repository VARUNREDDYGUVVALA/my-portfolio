import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('renders resume content and all assets without errors', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`)
  })
  await page.goto('')
  await expect(page).toHaveTitle(
    'Varunreddy Guvvala | Senior Python AI Engineer',
  )
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'AI that earns',
  )
  for (const id of [
    'about',
    'skills',
    'projects',
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
  await expect(
    page.getByRole('heading', { name: 'Bachelor of Technology' }),
  ).toBeAttached()
  await expect(page.locator('a[download]')).toHaveCount(0)
  await expect(page.locator('a[href*="github.com"]')).toHaveCount(0)
  for (const asset of [
    'favicon.svg',
    'social-card.png',
    'robots.txt',
    'sitemap.xml',
  ])
    expect((await page.request.get(asset)).ok()).toBeTruthy()
  expect(errors).toEqual([])
})
test('navigation, interactive architecture, and contribution disclosure work', async ({
  page,
  isMobile,
}) => {
  await page.goto('')
  await page.getByRole('button', { name: /01\s*Retrieve/ }).click()
  await expect(
    page.getByRole('button', { name: /01\s*Retrieve/ }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(
    page.getByText('Bring relevant knowledge into context.'),
  ).toBeVisible()
  if (isMobile)
    await page.getByRole('button', { name: 'Open navigation' }).click()
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
  await expect(disclosure).toHaveAttribute('open', '')
  await expect(disclosure.getByText(/Engineered a RAG platform/)).toBeVisible()
})
test('case studies open, trap focus, close with Escape, and restore focus', async ({
  page,
}) => {
  await page.goto('')
  for (const title of [
    'Healthcare knowledge & agent platform',
    'Financial risk & MLOps platform',
    'Retail recommendation & forecasting',
  ]) {
    const trigger = page.getByRole('button', {
      name: `Read case study: ${title}`,
      exact: true,
    })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
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
test('contact destinations and internal anchors are valid', async ({
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
  const missing = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((a) => a.getAttribute('href'))
        .filter((href) => !document.getElementById(href.slice(1))),
    )
  expect(missing).toEqual([])
})
test('responsive layout has no horizontal overflow', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.locator('footer').scrollIntoViewIfNeeded()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBeTruthy()
  }
})
test('accessibility scan passes WCAG AA checks, including modal', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  for (const id of [
    'about',
    'skills',
    'projects',
    'experience',
    'education',
    'contact',
  ])
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
  await page.waitForTimeout(600)
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(result.violations).toEqual([])
  await page
    .getByRole('button', {
      name: 'Read case study: Healthcare knowledge & agent platform',
    })
    .click()
  const modal = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(modal.violations).toEqual([])
})

test('industry filters show matching case studies and restore all work', async ({
  page,
}) => {
  await page.goto('')
  const filters = page.getByRole('group', {
    name: 'Filter case studies by industry',
  })
  for (const [industry, title] of [
    ['Healthcare', 'Healthcare knowledge & agent platform'],
    ['Banking', 'Financial risk & MLOps platform'],
    ['Retail', 'Retail recommendation & forecasting'],
  ]) {
    await filters.getByRole('button', { name: industry, exact: true }).click()
    await expect(
      filters.getByRole('button', { name: industry, exact: true }),
    ).toHaveAttribute('aria-pressed', 'true')
    await expect(
      page.getByRole('button', { name: /^Read case study:/ }),
    ).toHaveCount(1)
    await expect(
      page.getByRole('button', { name: `Read case study: ${title}` }),
    ).toBeVisible()
  }
  await filters.getByRole('button', { name: /All/ }).click()
  await expect(
    page.getByRole('button', { name: /^Read case study:/ }),
  ).toHaveCount(3)
})
