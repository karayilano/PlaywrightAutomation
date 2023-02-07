const base = require("@playwright/test")

exports.customtest = base.test.extend(
    {
        testDataForOrder: 
        {
            username: "test222@gmail.com",
            password: "Iamking@00",
            productName: "adidas original"
        }
    }
)