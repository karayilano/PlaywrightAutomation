const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://google.com');
    console.log(await page.title())
    await expect(page).toHaveTitle('Google');
});

test('Page Playwright test', async ({page}) =>
{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto('https://kou.ist');
    await expect(page).toHaveTitle("Kou – Kou Music")
});