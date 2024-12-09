// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");

// (() => {
//     puppeteer.use(StealthPlugin());

//     puppeteer.launch({
// headless : false,
// executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
// userDataDir: "/Users/ndb/Library/Application Support/Google/Chrome/Default",
//     })

//     .then(browser => browser.newPage())
//     .then(page => page.goto('https://www.facebook.com'))
//     .catch(err => console.error(err));
// })();


const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const randomUseragent = require('random-useragent'); // Random User-Agent Library

puppeteer.use(StealthPlugin());

(async () => {
    puppeteer.launch({
        headless: false,
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        userDataDir: "/Users/ndb/Library/Application Support/Google/Chrome/Default",
    })
        .then(async browser => {
            console.log('Running tests..')
            const page = await browser.newPage()
            await page.goto('https://www.facebook.com/groups/211616406116962/?sorting_setting=CHRONOLOGICAL')
            
          })

})();