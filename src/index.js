import { initialize } from "./browser.js";
import { changeAvatar } from "./changeAvatar.js";
import { loginGmailGoogle } from "./loginGoogle.js";

async function main() {
  try {
    const account = {
      gmail: "brilliantop2412@gmail.com",
      pass: "buidoanhung1",
      authGoogleId: "113781490583628852276",
      fingerprintSeed: "asdasdwq1212",
    };
    const context = await initialize(account);
    if (context) {
      const page = await context.newPage();
      const check = await loginGmailGoogle(page, account);
      const className = "tyrtyrtyrt";
      if (check) {
        await changeAvatar(page, className, 537903228764);
      }
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js ~ line 17 ~ main ~ error", error);
  }
}

main().catch((e) => console.log(e));
