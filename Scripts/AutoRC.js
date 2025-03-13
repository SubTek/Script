var request = typeof $request !== "undefined" ? $request : null;
if (!request) {
    console.log("Request object is undefined.");
    $done({});
}

delete request?.headers?.["x-revenuecat-etag"];
delete request?.headers?.["X-RevenueCat-ETag"];

const ent = JSON.parse($response?.body || "{}");

let jsonToUpdate = {
    "request_date_ms": 1704070861000,
    "request_date": "2024-01-01T01:01:01Z",
    "subscriber": {
        "entitlement": {},
        "first_seen": "2024-01-01T01:01:01Z",
        "original_application_version": "2099",
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

if (!productEntitlementMapping || Object.keys(productEntitlementMapping).length === 0) {
    console.log("No entitlements found, setting default to 'premium'");

    jsonToUpdate.subscriber.entitlements["premium"] = {
        "purchase_date": "2024-01-01T01:01:01Z",
        "original_purchase_date": "2024-01-01T01:01:01Z",
        "expires_date": "2099-01-01T01:01:01Z",
        "is_sandbox": false,
        "ownership_type": "PURCHASED",
        "store": "app_store",
        "product_identifier": "default_product_id"
    };
} else {
    for (const [entitlementId, productInfo] of Object.entries(productEntitlementMapping)) {
        const productIdentifier = productInfo.product_identifier || "default_product_id";
        const entitlements = productInfo.entitlements || [];

        for (const entitlement of entitlements) {
            jsonToUpdate.subscriber.entitlements[entitlement] = {
                "purchase_date": "2024-01-01T01:01:01Z",
                "original_purchase_date": "2024-01-01T01:01:01Z",
                "expires_date": "2099-01-01T01:01:01Z",
                "is_sandbox": false,
                "ownership_type": "PURCHASED",
                "store": "app_store",
                "product_identifier": productIdentifier
            };

            jsonToUpdate.subscriber.subscriptions[productIdentifier] = {
                "expires_date": "2099-01-01T01:01:01Z",
                "original_purchase_date": "2024-01-01T01:01:01Z",
                "purchase_date": "2024-01-01T01:01:01Z",
                "is_sandbox": false,
                "ownership_type": "PURCHASED",
                "store": "app_store"
            };
        }
    }
}

body = JSON.stringify(jsonToUpdate);
$done({ body });
