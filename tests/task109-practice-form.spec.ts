import { test, expect } from '@playwright/test';
import path from 'path';

/**
 * Task 109
 * 1. Go to Forms > Practice Form
 * 2. Fill all form fields such that:
 * 3. In Date of Birth, click on the calendar icon, and choose a date in the past (2 months ago)
 * 4. In Hobbies, select all values
 * 5. In Picture, Upload a Picture
 * 6. Take a Screenshot as the form is not submitting

 */
test('Task 109 ', async ({ page }) => {
  await page.goto('selenium_automation_practice.php');

  // Name / Email - targeted by placeholder as a first guess; if these fields don't have
  // matching placeholders, fall back to the first two visible text-ish inputs on the page.
  const nameField = page.getByPlaceholder(/name/i).or(page.locator('input[type="text"]').first());
  const emailField = page.getByPlaceholder(/email/i).or(page.locator('input[type="email"]').first());
  await nameField.first().fill('Ghada Mohamed');
  await emailField.first().fill('ghada.mohamed@example.com');

  // Gender - same fix as Task 103: target radios by fixed position (Male=0, Female=1, Other=2)
  // instead of by label, since these aren't real <label> associations either.
  const genderRadios = page.locator('input[type="radio"]');
  const femaleRadio = genderRadios.nth(1);
  await femaleRadio.check({ force: true });
  await expect(femaleRadio).toBeChecked();

  // Mobile
  const mobileField = page.getByPlaceholder(/mobile/i);
  await mobileField.fill('01142546374');

  // Date of Birth - native <input type="date" id="dob">, no calendar popup on this site.
  const target = new Date();
  target.setMonth(target.getMonth() - 2);
  const targetIso = target.toISOString().split('T')[0];

  const dobInput = page.locator('#dob');
  await dobInput.fill(targetIso);

  // --- UNVERIFIED: Subjects type-ahead ---
  const subjectsInput = page.getByPlaceholder(/subject/i);
  await subjectsInput.fill('Maths');
  await subjectsInput.press('Enter');

  // Hobbies - select all. Same fix as gender: position-based checkboxes (Sports, Reading,
  // Music, in that fixed order) since there's no real <label> to hang getByLabel off.
  const hobbyCheckboxes = page.locator('input[type="checkbox"]');
  const hobbyCount = await hobbyCheckboxes.count();
  for (let i = 0; i < hobbyCount; i++) {
    await hobbyCheckboxes.nth(i).check({ force: true });
    await expect(hobbyCheckboxes.nth(i)).toBeChecked();
  }

  // Picture upload
  const picturePath = path.join(__dirname, '..', 'test-data', 'sample-upload.txt');
  await page.locator('input[type="file"]').setInputFiles(picturePath);

  // Current Address - site placeholder has a typo ("Currend Address")
  const addressField = page.getByPlaceholder(/curren[dt] address/i);
  await addressField.fill('221B Baker Street, London');

  // State and City - native <select> dropdowns
  await page.locator('#state').selectOption('NCR');
  await page.locator('#city').selectOption('Lucknow');

  // Step 6: screenshot instead of submitting
  await page.screenshot({ path: 'test-results/task109-practice-form-filled.png', fullPage: true });
});