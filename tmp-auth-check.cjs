const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });

  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  page.on("pageerror", (err) => console.log("pageerror:", err.message));

  await page.goto("http://127.0.0.1:5174/", { waitUntil: "networkidle" });
  console.log("landing_title_count:", await page.locator("text=Train. Simulate. Certify.").count());

  await page.getByRole("button", { name: "Get Started" }).click();
  console.log("login_title_count:", await page.locator("text=Welcome Back").count());

  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForTimeout(300);

  console.log("dashboard_count:", await page.locator("text=Good evening, Alex.").count());

  await page.screenshot({ path: "artifacts/auth-flow.png", fullPage: true });
  await browser.close();
})();
