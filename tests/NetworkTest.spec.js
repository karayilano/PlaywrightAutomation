import { test, expect, request } from '@playwright/test';
const {APIUtils} = require("../utils/APIUtils.js")
const loginPayload = {userEmail:"kursattest@gmail.com", userPassword:"Iamking@123"};
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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63d3a134568c3e9fb1038a55",
    async route => 
    {
        let body = JSON.stringify(fakePayloadOrders);
        //intercepting response
        const response = await page.request.fetch(route.request());
        route.fulfill(
            {
                response,
                body,
            });
    });
    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();    

});