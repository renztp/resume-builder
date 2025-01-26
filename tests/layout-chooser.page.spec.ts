import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.locator('html').click();
  await page.locator('img').nth(1).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#name').click();
  await page.locator('#name').fill('Test');
  await page.locator('#occupation').click();
  await page.locator('#occupation').fill('Software Developer');
  await page.locator('#email').click();
  await page.locator('#email').fill('tullaorenz@gmail.com');
  await page.locator('#phoneNumber').click();
  await page.locator('#phoneNumber').fill('0951444329');
  await page.locator('#location').click();
  await page.locator('#location').fill('Pampanga, Philippines');
  await page.getByLabel('LinkedIn').locator('div').nth(2).click();
  await page.getByLabel('Reddit').locator('div').nth(2).click();
});
