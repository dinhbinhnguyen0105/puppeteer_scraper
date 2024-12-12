const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function crawl(userDataDir, executablePath, groupUrl, count, keywords) {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: false,
        executablePath: executablePath,
        userDataDir: userDataDir
    });
    const mainPage = await browser.newPage();
    await mainPage.goto(groupUrl);

    const feedElm = await mainPage.waitForSelector("div[role='feed']");
    if(!feedElm) return false;
    const articleElm = await feedElm.waitForSelector("div[aria-describedby]");


}

const payload = {
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    userDataDir: "/Users/dinhbinh/Workspace/mymanager-v2/bin/browsers/61567543202733",
    groupUrl: 'https://www.facebook.com/groups/211616406116962/?sorting_setting=CHRONOLOGICAL',
    count: 5,
    keywords: ["chính chủ", "cc", "hh", "hoa hồng"],
};

(async () => {
    await crawl(payload.userDataDir, payload.executablePath, payload.groupUrl, payload.count, payload.keywords);
})();