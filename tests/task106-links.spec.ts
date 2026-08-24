import { test, expect } from '@playwright/test';

/**
 * Task 106
 * 1. Go to Elements > Links
 * 2. Click on Last Link "Not Found"
 * 3. Assert that the message appeared
 * 4. Then Click on First Link "Home"
 * 5. Assert that the page contains "login" word
 
 */
test('Task 106 ', async ({ page, context }) => {
  await page.goto('links.php');

  // Step 2-3: last link is "Not Found" - confirmed real id from the page's own error output
  const notFoundLink = page.locator('#not-found');
  await notFoundLink.click();
  await expect(page.getByText(/status text\s*Not Found/i)).toBeVisible();

  // Step 4-5: first link is "Home", opens a new tab.

  const homeLink = page.getByText('Home', { exact: true }).first();
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    homeLink.click(),
  ]);
  await newPage.waitForLoadState('domcontentloaded');

  await expect(newPage.getByText(/login/i).first()).toBeVisible();
});