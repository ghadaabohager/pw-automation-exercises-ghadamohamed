import { test, expect } from '@playwright/test';

/**
 * Task 108
 * 1. Go to Elements > Dynamic Properties
 * 2. Wait for the second button "Visible after 5 seconds" to be displayed
 * 3. Assert that the button had appeared
 
 */
test('Task 108 ', async ({ page }) => {
  await page.goto('dynamic-prop.php');
  await page.locator('#colorChange').click();
  const delayedButton = page.getByText('Visible After 5 Seconds', { exact: true });
 
  await expect(delayedButton).toBeVisible({ timeout: 10000 });
});