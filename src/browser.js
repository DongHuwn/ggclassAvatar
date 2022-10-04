import { chromium } from "playwright";
import path from "path";
import { addStealth } from "./stealth.js";
import { spoofing } from "./spoofing.js";
export const initialize = async (profile) => {
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.50";

  const options = {
    headless: false,
    ignoreHTTPSErrors: true,
    viewport: null,
    ignoreDefaultArgs: [
      "--enable-automation",
      "--disable-extensions",
      "--disable-component-extensions-with-background-pages",
    ],
    chromiumSandbox: false,
    userAgent,
    args: [
      "--enable-webgl",
      "--use-gl=desktop",
      "--disable-dev-shm-usage",
      "--shm-size=4gb",
    ],
  };
  try {
    const pathProfile = `./profilePath`;
    const context = await chromium.launchPersistentContext(
      path.join(`${pathProfile}`, `${profile.authGoogleId}`),
      options
    );
    await addStealth(context).catch((e) =>
      console.error(`error add stealth ${e}`)
    );
    await context
      .addInitScript(spoofing, profile.fingerprintSeed)
      .catch((e) => console.error(`error evaluate ${e}`));
    context.setDefaultNavigationTimeout(0);
    return context;
  } catch (error) {
    return undefined;
  }
};
