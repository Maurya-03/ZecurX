const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });

  const context = await browser.newContext({ viewport: { width: 1365, height: 860 } });
  const page = await context.newPage();

  await page.goto("http://127.0.0.1:5176/", { waitUntil: "networkidle" });

  const classBefore = await page.evaluate(() => document.body.className);
  const toggleCount = await page.locator(".theme-toggle-btn").count();
  await page.locator(".theme-toggle-btn").first().click();
  await page.waitForTimeout(120);
  const classAfter = await page.evaluate(() => document.body.className);
  const storedTheme = await page.evaluate(() => localStorage.getItem("zecurx-theme"));

  console.log("toggleCount:", toggleCount);
  console.log("bodyClassBefore:", classBefore || "(none)");
  console.log("bodyClassAfter:", classAfter || "(none)");
  console.log("storedTheme:", storedTheme);

  await page.screenshot({ path: "artifacts/theme-toggle-landing.png", fullPage: true });
  await browser.close();
})();
