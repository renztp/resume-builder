import { chromium } from 'playwright';

describe('Layout choose page', () => {
  it('should choose a layout', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4200/');
    expect(await page.title()).toBe('ResumeBuilder');
    await browser.close();
  });
});
