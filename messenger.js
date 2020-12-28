require('dotenv').config();
const puppeteer = require('puppeteer');  
const batchNames = require('./batchnames');
const CONSTANTS = require('./constants');

( async () => {
/*  |-------------------
    |   TEMPLATES
    |------------------- */
    let counter = 0;
    let targetUrl = 'https://www.messenger.com/login';

const sendMessage = async (name) => {
    await page.waitForTimeout(CONSTANTS.TWO_SECONDS);
    await page.waitForSelector('input[placeholder="Search Messenger"]');
    await page.click('input[placeholder="Search Messenger"]');

    const searchInput = await page.evaluateHandle(() => document.activeElement);
    await searchInput.type(name);

    /*
    await page.waitForTimeout(CONSTANTS.FIVE_SECONDS);
    await page.keyboard.press('ArrowDown');

    await page.waitForTimeout(CONSTANTS.ONE_SECOND);
    await page.keyboard.press(CONSTANTS.PRESS_ENTER);

    await page.waitForTimeout(CONSTANTS.FIVE_SECONDS);

    const messageInput = await page.evaluateHandle(() => document.activeElement);
    await messageInput.type(process.env.USER_MESSAGE);

    
    await page.waitForTimeout(CONSTANTS.EIGHT_SECONDS);
    await page.keyboard.press(CONSTANTS.PRESS_ENTER);

    counter++;
    console.log('counter', counter);

    if(counter < batchNames.length) { sendMessage(batchNames[counter]); }
    else { console.log('Bot send messages completed') }
    */
   
};
/*  |----------------------
    |  TARGET SEARCH NAME
    |---------------------- */
    

/*  |----------------------
    |  TARGET MESSAGE INPUT
    |---------------------- */
    
    
/*  |-------------------
    |   INIT BROWSER
    |------------------- */
    const config = { headless: false, slowMo: 20, defaultViewport: { 
        width: CONSTANTS.APP_WIDTH, 
        height: CONSTANTS.APP_HEIGHT 
    }};

    const browser = await puppeteer.launch(config);
    const context = browser.defaultBrowserContext();
    context.overridePermissions(targetUrl, ['notifications']);
    const page = await browser.newPage();
/*  |-------------------
    |   GOTO FACEBOOK
    |------------------- */
    await page.setDefaultNavigationTimeout(100000);
    await page.setViewport({
        width: CONSTANTS.APP_WIDTH, 
        height: CONSTANTS.APP_HEIGHT 
    }); // 1600x1200
    await page.goto(targetUrl);

/*  |-------------------
    |  LOGIN CREDENTIALS
    |------------------- */

    await page.waitForTimeout(CONSTANTS.FIVE_SECONDS);

    await page.waitForSelector('#email');
    await page.type('#email', process.env.FB_EMAIL);
    await page.type('#pass', process.env.FB_PASSWORD);
    await page.click('[type="submit"]');
    await page.waitForNavigation();

/*  |-------------------
    |  START MESSAGE HERE
    |------------------- */
    await sendMessage(batchNames[counter]);
})();