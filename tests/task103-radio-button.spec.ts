import { test, expect } from '@playwright/test';

/**
 * Task 103
 * 1. Go to Elements > Radio Button
 * 2. Check "Impressive"
 * 3. Assert the displayed message is correct
 
 */
test('Task 103 ', async ({ page }) => {
  await page.goto('radio-button.php');

  const impressiveRadio = page.locator('input[type="radio"]').nth(1);
  await impressiveRadio.check({ force: true });

  await expect(impressiveRadio).toBeChecked();
  await expect(page.getByText(/you have checked impressive/i)).toBeVisible();
});