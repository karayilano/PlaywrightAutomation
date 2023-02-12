const {test, expect} = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager')
const { customtest } = require('../utils/extend-test')

const dataSet = JSON.parse(JSON.stringify(require("../testdatas/placeorderTestData.json")));
test.describe.configure({mode:'serial'});
for(const data of dataSet)
{
    test(`Client App ${data.productName} `, async ({page}) =>
    {
        const username = data.username;
        const password = data.password;
        const productName = data.productName;

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(username, password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(productName);
        await cartPage.clickCheckout();

        const orderPage = poManager.getOrderPage();
        await orderPage.selectCountry("tur", "Turkey")
        await orderPage.fillOrderPage();
        const orderId = await orderPage.submitAndGetOrderId();

        await dashboardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);

        await expect(page.locator(".-main")).toHaveText(orderId);
    });
}

customtest("Custom test", async({page, testDataForOrder}) => 
{
    const username = testDataForOrder.username;
    const password = testDataForOrder.password;
    const productName = testDataForOrder.productName;

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.clickCheckout();

    const orderPage = poManager.getOrderPage();
    await orderPage.selectCountry("tur", "Turkey")
    await orderPage.fillOrderPage();
    const orderId = await orderPage.submitAndGetOrderId();

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);

    await expect(page.locator(".-main")).toHaveText(orderId);

})