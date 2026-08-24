import { test, expect } from '@playwright/test';

/**
 * Task 105
 * 1. Go to Elements > Buttons
 * 2. Click on Button "Click Me"
 * 3. Assert that the message appeared
 */
test('Task 105 ', async ({ page }) => {
  await page.goto('buttons.php');

  await page.getByRole('button', { name: 'Click Me', exact: true }).click();

  await expect(page.getByText('You have done a dynamic click')).toBeVisible();
});
