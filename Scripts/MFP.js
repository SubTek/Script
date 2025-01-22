var body = $response['body'];
var response = JSON.parse(body);

response = {
    "status": "success",
    "message": "Premium features have been unlocked.",
    "premium": {
        "is_premium": true,
        "expiration_date": "2099-12-31T23:59:59Z",
        "features": [
            "no_ads",
            "priority_support",
            "unlimited_access",
            "premium_content"
        ]
    }
};

body = JSON.stringify(response);

$done({ body: body });
