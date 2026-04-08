const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  await page.goto("http://127.0.0.1:5176/", { waitUntil: "networkidle" });

  const checks = [
    { label: "Courses", id: "section-courses" },
    { label: "Instructors", id: "section-instructors" },
    { label: "Certifications", id: "section-certifications" },
    { label: "Company", id: "section-company" },
  ];

  for (const item of checks) {
    await page.locator('.landing-nav-link', { hasText: item.label }).first().click();
    await page.waitForTimeout(260);
    const top = await page.locator(`#${item.id}`).evaluate((el) => el.getBoundingClientRect().top);
    console.log(`${item.label}Top:`, Math.round(top));
  }

  await page.screenshot({ path: "artifacts/nav-routed-sections.png", fullPage: true });
  await browser.close();
})();
