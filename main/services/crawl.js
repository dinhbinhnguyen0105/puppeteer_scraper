const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const userDataDir = "/Users/ndb/Library/Application Support/Google/Chrome/Default";

(async () => {
    const count = 5;
    puppeteer.launch({
        headless: false,
        devtools: true,
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        userDataDir: "/Users/dinhbinh/Workspace/mymanager-v2/bin/browsers/61566863008632",
        // executablePath: executablePath,
        // userDataDir: userDataDir,
    })
        .then(async browser => {
            console.log('Running tests..');
            const page = await browser.newPage();
            await page.goto('https://www.facebook.com/groups/211616406116962/?sorting_setting=CHRONOLOGICAL');
            return page;
        })
        .then(async page => {
            for (let i = 0; i < 5; i++) {
                const feedElm = await page.waitForSelector("div[role='feed']");
                const articleElm = await feedElm.waitForSelector("div[aria-describedby]");
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
                console.log();

                listInfoElms.forEach(async elm => {
                    if (elm) {
                        // console.log(elm);
                        const textContent = await elm.getProperty("textContent");
                        console.log(textContent.jsonValue());
                    } else console.log("Invalid elm");
                })

                await articleElm.evaluate(elm => elm.parentNode.removeChild(elm));
            }
            // await new Promise(r => setTimeout(r, 1000));
        })
        .catch(error => {
            console.error("Lỗi:", error.message);
        });



})();

// aria-describedby // aria-labelledby
// data-ad-rendering-role="story_message"
// data-ad-comet-preview="message"
// await new Promise(r => setTimeout(r, 2000));


