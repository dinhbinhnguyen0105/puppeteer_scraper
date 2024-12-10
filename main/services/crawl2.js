const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
// const userDataDir = "/Users/ndb/Library/Application Support/Google/Chrome/Default";

async function crawl(userDataDir, url, count) {
    console.log("--crawl--");
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     devtools: false,
    //     executablePath: executablePath,
    //     userDataDir: userDataDir
    // });
}