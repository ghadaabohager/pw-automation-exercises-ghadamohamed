import { test, expect } from '@playwright/test';

/**
 * Task 110
 * 1. Go to Alerts, Frames & Windows > Browser Windows
 * 2. Click on "New Tab"
 * 3. Go to the opened tab
 * 4. Assert that the page contains "New Tab"
 */
test('Task 110 ', async ({ page, context }) => {
  await page.goto('browser-windows.php');

  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'New Tab', exact: true }).click(),
  ]);
  await newTab.waitForLoadState();

  await expect(newTab.getByText('New Tab', { exact: false }).first()).toBeVisible();
});
