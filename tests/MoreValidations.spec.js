import { test, expect } from '@playwright/test';



test("Popup validations", async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();

    //visible - hidden example
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //popup example
    page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();

    //hover example
    await page.locator("#mousehover").hover();
    await page.locator("[href='#top']").click();

    //switching frame
    const framePage = page.frameLocator("#courses-iframe");
    await page.locator("#courses-iframe").scrollIntoViewIfNeeded();
    await framePage.locator("li a[href='lifetime-access']:visible").click();
    const text = await framePage.locator(".text h2").textContent();
    expect(text.split(" ")[1]).toEqual("13,522");

});


test("Automation practices", async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Radio Button Example
    await page.click("input[value='radio2']");

    //Suggession Class Example
    await page.locator("#autocomplete").type("ven", {delay:500});
    await page.click("text=Venezuela");

    //Dropdown Example
    await page.selectOption("#dropdown-class-example", "option3");

    //Checkbox Example
    await page.check("#checkBoxOption3");

    //Switch Window Example
    // const [newPage] = await Promise.all(
    //     [
    //         context.waitForEvent('page'),
    //         page.click("#openwindow")
    //     ]
    // );
    
    // console.log(await newPage.title());
    // console.log(await page.title());


    //Switch Tab Example
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            page.click("#opentab")
        ]
    );
    await newPage.close();


    //Switch To Alert Example
    const name = "Kursat";
    await page.fill("#name", name);
    page.on('dialog', async dialog => 
    {
        // Verify type of dialog
        expect(dialog.type()).toContain('alert'); 

        // verify message of alert
        expect(dialog.message()).toContain(`Hello ${name}, share this practice page and share your knowledge`);

        //click on alert ok button
        await dialog.accept();
    });

    // Click on Trigger an alert button
    await page.click("#alertbtn");


    //Web Table Fixed header
    const tableRows = page.locator("[name='courses'] tr");
    let sum = 0;
    for(let i=0; i < await tableRows.count(); i++)
    {
        if(i==0) continue;
        const amount = await tableRows.nth(i).locator("td").nth(2).textContent();
        sum = sum + parseInt(amount);
    }
    console.log(sum);
    await page.pause();

});


test("Screenshot & visual comparison", async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();

    //screenshot
    await page.screenshot({path: 'screenshot.png'})

    await expect(page.locator("#displayed-text")).toBeHidden();

})

test("visual comparison", async ({page}) => 
{
    await page.goto("https://google.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})