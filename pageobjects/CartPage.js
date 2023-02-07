const { expect } = require('@playwright/test')

class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.cardItem = page.locator("div.cart li").first();
        this.product = page.locator(".cartSection h3");
        this.checkoutButton = page.locator("text=Checkout");
    }

    async VerifyProductIsDisplayed(productName)
    {
        await this.cardItem.waitFor();
        await expect(this.product).toHaveText(productName);    
    }

    async clickCheckout()
    {
        await this.checkoutButton.click();
    }
}

module.exports = {CartPage}