import { test, expect } from '@playwright/test';

/**
 * Task 114
 * 1. Go to Widgets > Auto Complete
 * 2. Type "a" then click on "Haskell"
 */
test('Task 114 ', async ({ page }) => {
  await page.goto('auto-complete.php');

  const tagsInput = page.getByLabel('Tags', { exact: false });
  await tagsInput.fill('a');

 
  const suggestion = page.locator('.ui-menu-item-wrapper', { hasText: 'Haskell' });
  await expect(suggestion).toBeVisible();
  await suggestion.click();


  await expect(tagsInput).toHaveValue('Haskell');
});