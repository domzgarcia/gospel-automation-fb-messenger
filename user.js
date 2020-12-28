require('dotenv').config();
const puppeteer = require('puppeteer');  
const batchNames = require('./batchnames');
let continueProcess = true;

( async () => {


/*  |-------------------
    |   TEMPLATES
    |------------------- */
    let counter = 0;
    let targetUrl = 'https://www.facebook.com';
    const PRESS_ENTER = String.fromCharCode(13);
    const TEN_SECONDS   = 10000;
    const EIGHT_SECONDS = 8000;
    const FIVE_SECONDS  = 5000;
    const FOUR_SECONDS  = 4000;
    const THREE_SECONDS = 3000;
    const TWO_SECONDS   = 2000;
    const ONE_SECOND    = 1000; 
    const NINE_SECONDS  = 9000;

const sendMessage = async (name) => {
/*  |----------------------
    |  TARGET SEARCH NAME
    |---------------------- */
    await page.waitForTimeout(TWO_SECONDS);
    await page.waitForSelector('input[placeholder="Search Facebook"]');
    await page.click('input[placeholder="Search Facebook"]');

    const searchInput = await page.evaluateHandle(() => document.activeElement);
    await searchInput.type(name);

    await page.waitForTimeout(FIVE_SECONDS);
    await page.keyboard.press('ArrowDown');

    await page.waitForTimeout(TWO_SECONDS);
    await page.keyboard.press(PRESS_ENTER);

/*  |----------------------
    |  TARGET MESSAGE INPUT
    |---------------------- */
    await page.waitForTimeout(TWO_SECONDS);
    
    try {
    
        await page.waitForTimeout(THREE_SECONDS);

        await page.waitForSelector('[aria-label="Contact"]');
        await page.waitForSelector('[aria-label="Message"]');
        
        await page.click('[aria-label="Message"]');

        await page.waitForTimeout(ONE_SECOND);

        const messageInput = await page.evaluateHandle(() => document.activeElement);

        if(messageInput){
            messageInput.type(process.env.USER_MESSAGE);
            await page.waitForTimeout(NINE_SECONDS);
            // await page.keyboard.press(PRESS_ENTER);

        } else {
            console.log('Was not able to create message');
        }
        
        await page.waitForTimeout(TWO_SECONDS);
        
        const closeBtn = await page.waitForSelector('[aria-label="Close chat"]');
        await closeBtn.click('[aria-label="Close chat"]');
        

    } catch(e) {
        console.log('Something went wrong...', e);
        // continueProcess = false;
    }

    counter++;
    console.log('counter...', counter);

    if(continueProcess && counter < batchNames.length) { sendMessage(batchNames[counter]); }
    else { console.log('Completed!!!'); }
}
    
/*  |-------------------
    |   INIT BROWSER
    |------------------- */
    const config = { headless: false, slowMo: 20, defaultViewport: { width: 1024, height: 768 } };
    const browser = await puppeteer.launch(config);
    const context = browser.defaultBrowserContext();
    context.overridePermissions(targetUrl, ['notifications']);
    const page = await browser.newPage();
/*  |-------------------
    |   GOTO FACEBOOK
    |------------------- */
    await page.setDefaultNavigationTimeout(100000);
    await page.setViewport({ width: 1024, height: 768 }); // 1600x1200
    await page.goto(targetUrl);
/*  |-------------------
    |  LOGIN CREDENTIALS
    |------------------- */
    await page.waitForSelector('#email');
    await page.type('#email', process.env.FB_EMAIL);
    await page.type('#pass', process.env.FB_PASSWORD);
    await page.click('[type="submit"]');
    await page.waitForNavigation();

    await sendMessage(batchNames[counter]);
})();