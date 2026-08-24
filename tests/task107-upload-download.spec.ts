import { test, expect } from '@playwright/test';
import path from 'path';

/**
 * Task 107
 * 1. Go to Elements > Upload and Download
 * 2. Browse a file on your computer to be selected for upload
 * 3. Take a screenshot
 */
test('Task 107 ', async ({ page }) => {
  await page.goto('upload-download.php');

  const filePath = path.join(__dirname, '..', 'test-data', 'sample-upload.txt');
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);

  // Assert the browser picked up the file name, confirming the upload control worked
  await expect(fileInput).toHaveJSProperty('files.0.name', 'sample-upload.txt');

  await page.screenshot({ path: 'test-results/task107-file-selected.png', fullPage: true });
});
