import { test, expect, request } from '@playwright/test';
const {APIUtils} = require("../utils/APIUtils.js")
const loginPayload = {userEmail:"test222@gmail.com", userPassword:"Iamking@00"};
const orderPayload = {orders: [{country:"Cuba",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]}
let token;
let orderId;
const fakePayloadOrders = {data:[], message:"No Orders"};
//will be execute before tests but only once
test.beforeAll( async() => 
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);

    token = await apiUtils.getToken();

    //Order creation via API
    orderId = await apiUtils.createOrder(orderPayload);
});


test('Browser Context Playwright test', async ({page}) =>
{
    page.addInitScript(value => 
    {
        window.localStorage.setItem('token', value);

    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();

    //mock
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63dcf704568c3e9fb10b4beb",
    route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63d7caf7568c3e9fb1065660'})
    )

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
    await page.pause();    

});