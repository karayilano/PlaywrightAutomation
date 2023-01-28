const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({page}) =>
{
    const products = page.locator(".card-body");
    const productName = "iphone 13 pro"
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("kursattest@gmail.com");
    await page.locator("#userPassword").fill("Iamking@123");
    await page.locator("#login").click();

    await page.waitForLoadState("networkidle");

    const count = await products.count();
    for(let i=1; i <= count; i++)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    };

    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div.cart li").first().waitFor();

    await expect(page.locator(".cartSection h3")).toHaveText(productName);
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").type("tur", {delay:500})
    await page.locator(".ta-results").waitFor();
    
    const optionsCount = await page.locator(".ta-results button").count();
    for(let i=0; i<optionsCount; ++i)
    {
        const text = await page.locator(".ta-results button").nth(i).textContent();
        if(text === " Turkey")
        {
            await page.locator(".ta-results button").nth(i).dblclick();
            break;
        }
    }

    await page.locator('[class="input ddl"]').first().selectOption("08");
    await page.locator('[class="input ddl"]').last().selectOption("30");
    await page.locator("[class='input txt']").first().fill("123");
    await page.locator("[class='input txt']").last().fill("Kursat K");
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    let orderId = await page.locator(".em-spacer-1 > .ng-star-inserted").textContent();
    orderId = orderId.replace(/\s/g, "");
    orderId = orderId.replace(/\|/g, '');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const itemTable = page.locator("tbody > tr");
    const rows = await itemTable.count();
    console.log(rows);
    for(let i=0; i<rows; ++i)
    {
        if(orderId === await itemTable.nth(i).locator("th").textContent())
        {
            await itemTable.nth(i).locator("button").first().click();
            break;
        }
    }
    await expect(page.locator(".-main")).toHaveText(orderId);
    await page.pause();
});
