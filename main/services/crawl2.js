const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

// const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
// const userDataDir = "/Users/ndb/Library/Application Support/Google/Chrome/Default";

async function crawl(userDataDir, executablePath, groupUrl, count, keywords) {
    console.log("--crawl--");
    const browser = await puppeteer.launch({
        headless: false,
        devtools: false,
        executablePath: executablePath,
        userDataDir: userDataDir
    });
    const mainPage = await browser.newPage();
    await mainPage.goto(groupUrl);

    for (let i = 0; i < count; i++) {
        const feedElm = await mainPage.waitForSelector("div[role='feed']");
        let articleElm = await feedElm.waitForSelector("div[aria-describedby]");
        const describedbyValue = await articleElm.evaluate(elm => {
            const describedbyAttrValue = elm.getAttribute("aria-describedby");
            const listOfIds = describedbyAttrValue.split(" ");
            return {
                creatorId: elm.getAttribute("aria-labelledby"),
                storyId: listOfIds[0],
                messageId: listOfIds[1],
                imgId: listOfIds[2],
                interactionsId: listOfIds[3],
                commentCountId: listOfIds[4],
            };
        });
        const listInfoElms = await Promise.all(Object.keys(describedbyValue).map(async desc => {
            const elm = await articleElm.$(`[id="${describedbyValue[desc]}"]`);
            return elm;
        }));

        const fbElm = await mainPage.$("a[aria-label='Facebook']");

        const articleInfo = {}
        listInfoElms.forEach(async (elm, index) => {
            if (elm) {
                await elm.scrollIntoView({ behaivor: "smooth" });
                switch (index) {
                    case 0:
                        const creatorName = await elm.getProperty("textContent");
                        const creatorElm = await elm.$("a"); await creatorElm.focus();
                        const creatorUrl = await creatorElm.getProperty("href");
                        articleInfo.creatorInfo = {};
                        articleInfo.creatorInfo.creatorName = await creatorName.jsonValue();
                        articleInfo.creatorInfo.creatorUrl = await creatorUrl.jsonValue();
                        await fbElm.focus();
                        break;
                    case 1:
                        const storyTime = await elm.getProperty("textContent");
                        const storyElm = await elm.$("a"); await storyElm.focus();
                        const storyUrl = await storyElm.getProperty("href");
                        articleInfo.storyInfo = {};
                        articleInfo.storyInfo.storyTime = await storyTime.jsonValue();
                        articleInfo.storyInfo.storyUrl = await storyUrl.jsonValue();
                        await fbElm.focus();
                        break
                    case 2:
                        const expandBtnElm = await elm.$("div[role='button']");
                        if (expandBtnElm) await expandBtnElm.click();
                        const message = await elm.getProperty("textContent");
                        articleInfo.message = await message.jsonValue();
                        break;
                    case 3: break;
                    default: break;
                }
                console.log(articleInfo);
            }

        });
        articleElm = await mainPage.waitForSelector('div[aria-describedby]');
        // Đảm bảo phần tử tồn tại trước khi xóa
        if (articleElm) {
        await articleElm.evaluate(elm => elm.parentNode.removeChild(elm));
        } else {
        console.error('Không thể xóa phần tử vì nó không tồn tại hoặc đã bị xóa.');
        }

    }
}

const payload = {
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    userDataDir: "/Users/dinhbinh/Workspace/mymanager-v2/bin/browsers/61566863008632",
    groupUrl: 'https://www.facebook.com/groups/211616406116962/?sorting_setting=CHRONOLOGICAL',
    count: 100,
    keywords: ["chính chủ", "cc", "hh", "hoa hồng"],
};

(async () => {
    await crawl(payload.userDataDir, payload.executablePath, payload.groupUrl, payload.count, payload.keywords);
})();