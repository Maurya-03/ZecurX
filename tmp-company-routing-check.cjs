const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  await page.goto("http://127.0.0.1:5176/", { waitUntil: "networkidle" });

  await page.locator('.landing-nav-link', { hasText: 'Company' }).first().click();
  await page.waitForTimeout(150);
  await page.getByRole('button', { name: 'About' }).last().click();
  await page.waitForTimeout(220);
  const aboutTop = await page.locator('#section-company-about').evaluate((el) => Math.round(el.getBoundingClientRect().top));

  await page.locator('.landing-nav-link', { hasText: 'Company' }).first().click();
  await page.waitForTimeout(150);
  await page.getByRole('button', { name: 'Careers' }).last().click();
  await page.waitForTimeout(220);
  const careersTop = await page.locator('#section-company-careers').evaluate((el) => Math.round(el.getBoundingClientRect().top));

  await page.locator('.landing-nav-link', { hasText: 'Company' }).first().click();
  await page.waitForTimeout(150);
  await page.getByRole('button', { name: 'Contact' }).last().click();
  await page.waitForTimeout(220);
  const contactTop = await page.locator('#section-company-contact').evaluate((el) => Math.round(el.getBoundingClientRect().top));

  console.log('aboutTop:', aboutTop);
  console.log('careersTop:', careersTop);
  console.log('contactTop:', contactTop);

  await page.screenshot({ path: 'artifacts/company-dropdown-routes.png', fullPage: true });
  await browser.close();
})();
