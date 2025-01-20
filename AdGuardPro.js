var response = JSON.parse($response.body);

response = {
    "products": [
        {
            "premium_status": "ACTIVE",
            "product_id": "com.adguard.lifetimePurchase"
        }
    ]
};

$done({ body: JSON.stringify(response) });
