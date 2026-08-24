import { test, expect } from '@playwright/test';

/**
 * Task 104
 * 1. Go to Elements > Web Tables
 * 2. Click on Add
 * 3. Fill the form
 * 4. Take a screenshot
 * 5. Click on Submit
 * 6. Then Delete All Records
 * 7. Assert that the Table is Empty
 *

 */
test('Task 104 ', async ({ page }) => {
  await page.goto('webtables.php');

  const table = page.locator('table').first();

  const addControl = page.getByRole('button', { name: 'Add', exact: true })
    .or(page.getByText('Add', { exact: true }));
  await addControl.first().click();

  // Step 3: fill the modal's fields by their real placeholders
  await page.getByPlaceholder('First Name', { exact: true }).fill('Ghada ');
  await page.getByPlaceholder('Last Name', { exact: true }).fill('Mohamed');
  await page.getByPlaceholder('Enter Email', { exact: true }).fill('ghada.mohamed@example.com');
  await page.getByPlaceholder('Enter Age', { exact: true }).fill('thirty');
  await page.getByPlaceholder('Enter Salary', { exact: true }).fill('one thouthsand egyption pound per month every month');
  await page.getByPlaceholder('Enter Department', { exact: true }).fill('QC');

  // Step 4: screenshot of the filled form before submitting
  await page.screenshot({ path: 'test-results/task104-form-filled.png', fullPage: true });

  // Step 5: submit
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Screenshot right after submit, for visual confirmation of whatever state the table
  // ends up in - useful evidence either way given the site's Add behavior is unreliable.
  await page.screenshot({ path: 'test-results/task104-after-submit.png', fullPage: true });

  // Step 6: delete all records - click the delete icon in the last row repeatedly until
  // none remain. Capped at 50 iterations as a safety net against an infinite loop.
  for (let i = 0; i < 50 && (await table.locator('tbody tr').count()) > 0; i++) {
    await table.locator('tbody tr').last().locator('td').last().locator('button, a, [role="button"]').last().click();
  }

  // Step 7: assert the table body is empty
  await expect(table.locator('tbody tr')).toHaveCount(0);
});