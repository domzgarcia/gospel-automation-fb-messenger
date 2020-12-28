require('dotenv').config()
const puppeteer = require('puppeteer');  
const batchNames = require('./batchnames');
let counter = 0;

( async () => {
// start
let targetUrl = 'https://www.facebook.com';
const PRESS_ENTER = String.fromCharCode(13);
const TEN_SECONDS   = 10000;
const EIGHT_SECONDS = 8000;
const FIVE_SECONDS  = 5000;
const THREE_SECONDS = 3000;
const TWO_SECONDS   = 2000;
const ONE_SECOND    = 1000;

const config = { headless: false, slowMo: 20 };
const browser = await puppeteer.launch(config);
const context = browser.defaultBrowserContext();
context.overridePermissions(targetUrl, ['notifications']);
const page = await browser.newPage();

const getARandomTime = () => {
    return Math.floor(Math.random()*3500)+1500;
}

const sendMessage = async () => {
    console.log('Sending a message');

    // NOTE: Tabs are inconsistent

    // await page.waitForSelector('[aria-label="Open more actions"]');
    await page.waitForSelector('[aria-label="Attach a photo or video"]');
    await page.waitForSelector('[aria-label="Choose a sticker"]');
    await page.waitForSelector('[aria-label="Choose a gif"]');

    await page.waitForTimeout(getARandomTime()); // THREE_SECONDS

    await page.keyboard.press("Tab");
    await page.waitForTimeout(ONE_SECOND);

    await page.keyboard.press("Tab");
    await page.waitForTimeout(ONE_SECOND);

    await page.keyboard.press("Tab");
    await page.waitForTimeout(ONE_SECOND);

    // await page.keyboard.press("Tab");
    // await page.waitForTimeout(ONE_SECOND);

    // await page.keyboard.press("Tab");
    // await page.waitForTimeout(ONE_SECOND);

    // await page.keyboard.press("Tab");
    // await page.waitForTimeout(ONE_SECOND);

    // Send Message
    const createAMessage = await page.evaluateHandle(() => document.activeElement);
    await createAMessage.type(`${process.env.USER_MESSAGE}`);

    await page.waitForTimeout(EIGHT_SECONDS);
    await page.keyboard.press(PRESS_ENTER);

    // await browser.close();
    console.log('Task ended!');
}

const insertName = async (name) => {

    await page.waitForTimeout(getARandomTime()); // THREE_SECONDS

    await page.waitForSelector('[aria-label="Search by name or group"]');

    const currentElement = await page.evaluateHandle(() => document.activeElement);
    await currentElement.type(name);
    
    await page.waitForTimeout(FIVE_SECONDS);
    await page.keyboard.press('ArrowDown');

    await page.waitForTimeout(ONE_SECOND);
    await page.keyboard.press(PRESS_ENTER);

    counter++;
    console.log('counter...', counter);

    if(counter < batchNames.length) { insertName(batchNames[counter]); }
    else { await sendMessage() }
}


// Open Facebook
await page.setDefaultNavigationTimeout(100000);
await page.setViewport({ width: 1024, height: 600 }); // 1600x1200
await page.goto(targetUrl);


// Automate Login
await page.waitForSelector('#email');
await page.type('#email', process.env.FB_EMAIL);
await page.type('#pass', process.env.FB_PASSWORD);
await page.click('[type="submit"]');
await page.waitForNavigation({ waitUntil: 'networkidle0'});

// Click New Message Button
await page.waitForTimeout(EIGHT_SECONDS); // TWO_SECONDS
await page.waitForSelector('[aria-label="New Message"]');
await page.click('[aria-label="New Message"]');

// Type Name
await page.waitForTimeout(TWO_SECONDS); // TWO_SECONDS
await insertName(batchNames[counter]);

// end
})();



// # iqfcb0g7 tojvnm2t
