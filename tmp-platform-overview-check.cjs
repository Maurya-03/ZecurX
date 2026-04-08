const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1365, height: 860 } });
  await page.goto("http://127.0.0.1:5176/", { waitUntil: "networkidle" });

  const sectionCount = await page.locator("#platform-overview").count();
  const certCardCount = await page.locator(".nav-intro-card:has-text('Certifications')").count();
  console.log("platformOverviewSection:", sectionCount);
  console.log("certificationsIntroCard:", certCardCount);

  await page.screenshot({ path: "artifacts/platform-overview-section.png", fullPage: true });
  await browser.close();
})();
