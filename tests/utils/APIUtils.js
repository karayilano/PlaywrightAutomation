class APIUtils
{

    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:this.loginPayload});
        const loginResponseJSON = await loginResponse.json();
        let token = loginResponseJSON.token;
        return token;
    }

    async createOrder(orderPayload)
    {
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: 
            {
                'Authorization': await this.getToken(),
                'Content-Type': 'application/json'
            }
        });
        const orderJSON = await orderResponse.json();
        let orderId = orderJSON.orders[0];
        return orderId;
    }

}

module.exports = {APIUtils}