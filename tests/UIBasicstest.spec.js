const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const signInbtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.type("rahulshetty");
    await page.locator("[type='password']").type("learning");
    await page.locator('#signInBtn').click();
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("rahulshettyacademy");

    await Promise.all(
        [
            page.waitForNavigation(),
            signInbtn.click()
        ]
    );
  
    //await cardTitles.nth(0).textContent()  
    const titles = await cardTitles.allTextContents();
    console.log(titles);
});