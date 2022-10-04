import * as constants from "./configs/constants.js";
const isLoggedIn = async (page) => {
  const signOutBtn = await page.waitForSelector(
    'a[href^="https://accounts.google.com/SignOutOptions"]'
  );
  if (signOutBtn) {
    return "loggedIn";
  }
  return "";
};
const fillAccountPasswordGoogle = async (page, pass, controller) => {
  const cleanPass = pass.trim();
  console.log("Start fill password:", cleanPass);
  await page.waitForSelector(constants.PASSWORD_INPUT, {
    state: "visible",
  });
  console.log(controller);
  if (!controller.isDone) {
    await page.locator(constants.PASSWORD_INPUT).fill("");
    await page.locator(constants.PASSWORD_INPUT).fill(cleanPass);
    const currentURL = page.url();
    await Promise.any([
      page.locator("#passwordNext > div > button").click({
        force: true,
        delay: 60,
      }),
      page.locator("input#submit").click({
        force: true,
        delay: 60,
      }),
      page.locator("div[data-primary-action-label] button").first().click({
        force: true,
        delay: 60,
      }),
    ]);
    await page.waitForURL((url) => url.toString() !== currentURL);
  }
  console.log("passwordFilled");
  return "passwordFilled";
};
const fillEmailInputGoogle = async (page, gmail, controller) => {
  console.log("Start fill email");
  // await page.waitForTimeout(800);
  await page.waitForSelector("#identifierId");
  if (controller.isDone) {
    return false;
  }
  await page.locator("#identifierId").fill("");
  await page.locator("#identifierId").fill(gmail.replace(/\s/g, ""));
  const currentURL = page.url();
  await Promise.any([
    page.locator("#identifierNext > div > button").click({
      force: true,
      delay: 60,
    }),
    page.locator("input#next").click({
      force: true,
      delay: 60,
    }),
    page.locator("input#submit").click({
      force: true,
      delay: 60,
    }),
    page.locator("div[data-primary-action-label] button").first().click({
      force: true,
      delay: 60,
    }),
  ]);
  await page.waitForURL((url) => url.toString() !== currentURL);
  console.log("emailFilled");
  return "emailFilled";
};

const selectAccount = async (page, gmail) => {
  const selector = `div[data-identifier="${gmail.toLowerCase()}"]`;
  await page.locator(selector).click();
  return "accountSelected";
};

const clickNotNow = async (page) => {
  const listItems = await page.waitForSelector('div[role="listitem"]');
  if (listItems) {
    await page.locator("button").first().click({
      force: true,
      delay: 100,
    });
    const currentURL = page.url();
    await page.waitForURL((url) => url.toString() !== currentURL);
    return "clickedNotNow";
  }
  return "";
};
const clickConfirmAccountProtect = async (page) => {
  // CONFIRM_PROTECT_ACCOUNT
  console.log("Click confirm account protect");
  const currentURL = page.url();
  await page.locator(constants.CONFIRM_PROTECT_ACCOUNT).click({
    force: true,
    delay: 60,
  });
  await page.waitForURL((url) => url.toString() !== currentURL);
  return "confirmAccountProtectDone";
};
const loginGmailGoogle = async (page, account) => {
  try {
    let checkSuccess = true;
    let currentURL = "";
    let result;
    await page.goto("https://mail.google.com");
    result = await isLoggedIn(page);
    // Click button login Google and wait for url change
    if (result !== "loggedIn") {
      currentURL = page.url();
      await page.locator(constants.BUTTON_SIGN_IN).click();
      await page.waitForURL((url) => url.toString() !== currentURL);

      do {
        // Check which site is this
        const thisRoundDone = {
          isDone: false,
        };
        const promises = [
          isLoggedIn(page),
          fillEmailInputGoogle(page, account.gmail, thisRoundDone),
          fillAccountPasswordGoogle(page, account.pass, thisRoundDone),
          selectAccount(page, account.gmail),
          clickNotNow(page),
          clickConfirmAccountProtect(page),
          // timedOut,
        ];
        // eslint-disable-next-line no-await-in-loop
        // @ts-ignore
        result = await Promise.any(promises);
        if (result) {
          thisRoundDone.isDone = true;
          console.log("controller: ", thisRoundDone);
        }
        console.log("Promise result: ", result);
      } while (result !== "loggedIn" && !result.startsWith("error"));
    }
    if (result === "loggedIn") {
      console.log("Logged successfully");
      account.isLoginGmailGoogleSuccess = true;
      checkSuccess = true;
    } else {
      checkSuccess = false;
    }

    return checkSuccess;
  } catch (error) {
    console.error(`Error when google: ${error.message}`);
    return false;
  }
};
// eslint-disable-next-line
export { loginGmailGoogle };
