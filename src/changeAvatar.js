import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const changeAvatar = async (page, className, classId) => {
  await page.goto("https://classroom.google.com/");

  await page.waitForSelector(`li[data-course-id='${classId}']`, {
    state: "visible",
  });
  let currentURL = await page.url();
  
  await page.locator(`li[data-course-id='${classId}']text=${className}`).click({
    delay: 80,
  });
  await page.waitForURL((url) => url.toString() !== currentURL);

  await page.waitForSelector('div[role="button"]:has-text("Customize")', {
    state: "visible",
  });

  await page.locator('div[role="button"]:has-text("Customize")').click({
    delay: 80,
  });
  const filePath = path.join(__dirname, "../assets/images/1045.jpg");
  const [fileChooser] = await Promise.all([
    // It is important to call waitForEvent before click to set up waiting.
    page.waitForEvent("filechooser"),
    // Opens the file chooser.
    page.locator('button:has-text("Upload photo")').click(),
  ]);

  await fileChooser.setFiles(filePath);
  await page
    .frameLocator('iframe[name="\\31 5fzm9qtzrmu"]')
    .locator("text=Select class theme")
    .nth(2)
    .click();
  currentURL = await page.url();
  await page.locator('div[role="button"]:has-text("Save")').nth(1).click();
  await page.waitForURL((url) => url.toString() !== currentURL);
};
