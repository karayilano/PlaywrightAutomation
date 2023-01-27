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

test("UI Controls", async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const userName = page.locator('input#username');
    const signInbtn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control ");
    const documentLink = page.locator("[href*='documents-request']")

    await userName.fill("rahulshettyacademy");
    await page.locator("[type='password']").type("learning");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await dropdown.selectOption("teach");
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');

    //await page.pause();

});

test("Child windows test", async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('input#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator("[href*='documents-request']")
    
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ]
    );
    const text = await newPage.locator(".red").textContent();
    const textArray = text.split('@');
    const domain = textArray[1].split(" ")[0];
    await userName.fill(domain);    
});