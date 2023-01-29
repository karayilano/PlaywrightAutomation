import { test, expect, request } from '@playwright/test';
const {APIUtils} = require("./utils/APIUtils.js")
const loginPayload = {userEmail:"kursattest@gmail.com", userPassword:"Iamking@123"};
const orderPayload = {orders: [{country:"Cuba",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]}
let token;
let orderId;
//will be execute before tests but only once
test.beforeAll( async() => 
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);

    token = await apiUtils.getToken();

    //Order creation via API
    orderId = await apiUtils.createOrder(orderPayload);
    console.log(orderId);

});

//will be executed before each test
test.beforeEach( () => 
{

});




test('Browser Context Playwright test', async ({page}) =>
{
    page.addInitScript(value => 
    {
        window.localStorage.setItem('token', value);

    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const itemTable = page.locator("tbody > tr");
    const rows = await itemTable.count();
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