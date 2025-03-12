var request = $request;

// Debugging: Log incoming request headers
console.log("Incoming Request Headers: ", JSON.stringify(request.headers, null, 2));

// Delete specified headers
delete request.headers["x-revenuecat-etag"];
delete request.headers["X-RevenueCat-ETag"];

console.log("Headers after deletion: ", JSON.stringify(request.headers, null, 2));

const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
        'Authorization': request.headers["authorization"],
        'X-Platform': 'iOS',
        'User-Agent': request.headers["user-agent"]
    }
}

// Debugging: Log API request options
console.log("API Request Options: ", JSON.stringify(options, null, 2));

$httpClient.get(options, function (error, newResponse, data) {
    if (error) {
        console.log("Error fetching data: ", error);
        $done({});
        return;
    }

    console.log("Response Data: ", data);

    const ent = JSON.parse(data);

    let jsonToUpdate = {
        "request_date_ms": 1704070861000,
        "request_date": "2024-01-01T01:01:01Z",
        "subscriber": {
            "entitlement": {},
            "first_seen": "2024-01-01T01:01:01Z",
            "original_application_version": "9692",
            "last_seen": "2024-01-01T01:01:01Z",
            "other_purchases": {},
            "management_url": null,
            "subscriptions": {},
            "entitlements": {},
            "original_purchase_date": "2024-01-01T01:01:01Z",
            "original_app_user_id": "70B24288-83C4-4035-B001-573285B21AE2",
            "non_subscriptions": {}
        }
    };

    const productEntitlementMapping = ent.product_entitlement_mapping;

    console.log("Product Entitlement Mapping: ", JSON.stringify(productEntitlementMapping, null, 2));

    // Check if productEntitlementMapping is empty
    if (!productEntitlementMapping || Object.keys(productEntitlementMapping).length === 0) {
        console.log("No entitlements found, setting default to 'premium'");

        // If entitlement is empty, set it to "premium"
        jsonToUpdate.subscriber.entitlements["premium"] = {
            "purchase_date": "2024-01-01T01:01:01Z",
            "original_purchase_date": "2024-01-01T01:01:01Z",
            "expires_date": "9692-01-01T01:01:01Z",
            "is_sandbox": false,
            "ownership_type": "PURCHASED",
            "store": "app_store",
            "product_identifier": "premium_product"
        };
    } else {
        for (const [entitlementId, productInfo] of Object.entries(productEntitlementMapping)) {
            const productIdentifier = productInfo.product_identifier;
            const entitlements = productInfo.entitlements;

            console.log(`Processing entitlement: ${entitlementId}, Product Identifier: ${productIdentifier}`);

            for (const entitlement of entitlements) {
                jsonToUpdate.subscriber.entitlements[entitlement] = {
                    "purchase_date": "2024-01-01T01:01:01Z",
                    "original_purchase_date": "2024-01-01T01:01:01Z",
                    "expires_date": "9692-01-01T01:01:01Z",
                    "is_sandbox": false,
                    "ownership_type": "PURCHASED",
                    "store": "app_store",
                    "product_identifier": productIdentifier
                };

                // Add product identifier to subscriptions
                jsonToUpdate.subscriber.subscriptions[productIdentifier] = {
                    "expires_date": "9692-01-01T01:01:01Z",
                    "original_purchase_date": "2024-01-01T01:01:01Z",
                    "purchase_date": "2024-01-01T01:01:01Z",
                    "is_sandbox": false,
                    "ownership_type": "PURCHASED",
                    "store": "app_store"
                };
            }
        }
    }

    console.log("Final JSON Response: ", JSON.stringify(jsonToUpdate, null, 2));

    body = JSON.stringify(jsonToUpdate);
    $done({ body });
});
