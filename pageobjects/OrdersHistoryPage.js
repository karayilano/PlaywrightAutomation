class OrdersHistoryPage
{
    constructor(page)
    {
        this.page = page;
    }

    async searchOrderAndSelect(orderId)
    {
        await this.page.locator("tbody").waitFor();
        const itemTable = this.page.locator("tbody > tr");
        const rows = await itemTable.count();
        for(let i=0; i<rows; ++i)
        {
            if(orderId === await itemTable.nth(i).locator("th").textContent())
            {
                await itemTable.nth(i).locator("button").first().click();
                break;
            }
        }
    }
}

module.exports = {OrdersHistoryPage}