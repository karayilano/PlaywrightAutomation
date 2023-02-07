const { expect } = require('@playwright/test')

class OrderPage
{
    constructor(page)
    {
        this.page = page;
        this.countryField = page.locator("[placeholder*='Country']");
        this.countryResult = page.locator(".ta-results");
        this.countryResultItem = page.locator(".ta-results button");

    }

    async selectCountry(countryAbbr, countryName)
    {
        await this.countryField.type(countryAbbr, {delay:500});
        await this.countryResult.waitFor();

        const optionsCount = await this.countryResultItem.count();
        for(let i=0; i<optionsCount; ++i)
        {
            const text = await this.countryResultItem.nth(i).textContent();
            if(text === " "+countryName)
            {
                await this.countryResultItem.nth(i).dblclick();
                break;
            }
        }
    }

    async fillOrderPage()
    {
        await this.page.locator('[class="input ddl"]').first().selectOption("08");
        await this.page.locator('[class="input ddl"]').last().selectOption("30");
        await this.page.locator("[class='input txt']").first().fill("123");
        await this.page.locator("[class='input txt']").last().fill("Kursat K");   
    }

    async submitAndGetOrderId()
    {
        await this.page.locator(".action__submit").click();
        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        let orderId = await this.page.locator(".em-spacer-1 > .ng-star-inserted").textContent();
        orderId = orderId.replace(/\s/g, "");
        orderId = orderId.replace(/\|/g, '');
        return orderId;
    }
}

module.exports = {OrderPage}