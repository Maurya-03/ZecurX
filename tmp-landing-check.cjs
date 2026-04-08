const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1365, height: 860 } });
  await page.goto("http://127.0.0.1:5175/", { waitUntil: "networkidle" });

  const hasSvg = await page.locator(".hero-svg").count();
  const before = await page.evaluate(() => window.scrollY);
  await page.getByRole("button", { name: "Browse Courses" }).click();
  await page.waitForTimeout(350);
  const after = await page.evaluate(() => window.scrollY);
  const hasPopularCourses = await page.locator("#popular-courses").count();

  console.log("hasSvg:", hasSvg);
  console.log("scrollBefore:", before);
  console.log("scrollAfter:", after);
  console.log("hasPopularCourses:", hasPopularCourses);

  await page.screenshot({ path: "artifacts/landing-svg-scroll.png", fullPage: true });
  await browser.close();
})();
