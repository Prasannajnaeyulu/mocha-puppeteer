const { expect } = require("chai");
const puppeteer = require("puppeteer");

describe("Google Search tests", () => {
        let browser, page;
        
        before(async () => {
            browser = await puppeteer.launch()
            page = await browser.newPage()
        })

        it('user open the google search page', async () => {
            await page.goto("https://www.google.com")
        });

        it('user searches for Krish Software Solutions', async () => {
            await page.waitFor('[name="q"]');
            await page.type('[name="q"]', 'Krish Software Solutions');
            await page.click('[name="q"]');
            await page.waitForXPath('//span[contains(text(),"Training centre")]');
            const autoSuggest = await page.$x('//span[contains(text(),"Training centre")]');
            console.log(`autosuggestion : ${autoSuggest}`);
            await autoSuggest[0].click();
        });

        it('verify search returns krishsoftsol website', async () => {
            await page.waitForXPath("//cite[text()='www.krishsoftsol.com']");
            const searchResult = await page.$x("//cite[text()='www.krishsoftsol.com']");
            console.log(`search result: ${searchResult[0]}`);
            const actualValue = await page.evaluate(e => e.textContent, searchResult[0]);
            expect(actualValue).to.equal("www.krishsoftsol.com");
        });

        after(async () => {
            await page.screenshot({ path: 'test.png' });
            await browser.close()
        });
})