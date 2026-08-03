var request = $request;

// Drop the ETag headers so RevenueCat always returns a fresh 200 body
// (a 304 Not Modified would leave us with nothing to rewrite).
delete request.headers["x-revenuecat-etag"];
delete request.headers["X-RevenueCat-ETag"];

const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
        'Authorization': request.headers["authorization"],
        'X-Platform': 'iOS',
        'User-Agent': request.headers["user-agent"]
    }
};

// Far-future expiry and a stable "purchased long ago" date used for every
// injected entitlement/subscription.
const EXPIRES_DATE = "2099-01-01T01:01:01Z";
const PURCHASE_DATE = "2024-01-01T01:01:01Z";

// Fallback product identifier for apps that report no product/entitlement
// mapping but still expect a named product on the entitlement.
const DEFAULT_PRODUCT_IDENTIFIER = "com.revenuecat.premium";

function buildEntitlement(productIdentifier) {
    return {
        "purchase_date": PURCHASE_DATE,
        "original_purchase_date": PURCHASE_DATE,
        "expires_date": EXPIRES_DATE,
        "is_sandbox": false,
        "ownership_type": "PURCHASED",
        "store": "app_store",
        "product_identifier": productIdentifier
    };
}

function buildSubscription() {
    return {
        "expires_date": EXPIRES_DATE,
        "original_purchase_date": PURCHASE_DATE,
        "purchase_date": PURCHASE_DATE,
        "is_sandbox": false,
        "ownership_type": "PURCHASED",
        "store": "app_store"
    };
}

// Grant a single entitlement plus its backing subscription.
function grant(subscriber, entitlementId, productIdentifier) {
    subscriber.entitlements[entitlementId] = buildEntitlement(productIdentifier);
    subscriber.subscriptions[productIdentifier] = buildSubscription();
}

// Debugging: Log API request options
//console.log("API Request Options: ", JSON.stringify(options, null, 2));

$httpClient.get(options, function (error, newResponse, data) {
    const now = new Date();

    const jsonToUpdate = {
        "request_date_ms": now.getTime(),
        "request_date": now.toISOString(),
        "subscriber": {
            "entitlement": {},
            "first_seen": PURCHASE_DATE,
            "original_application_version": "2099",
            "last_seen": PURCHASE_DATE,
            "other_purchases": {},
            "management_url": null,
            "subscriptions": {},
            "entitlements": {},
            "original_purchase_date": PURCHASE_DATE,
            "original_app_user_id": "70B24288-83C4-4035-B001-573285B21AE2",
            "non_subscriptions": {}
        }
    };

    const subscriber = jsonToUpdate.subscriber;

    // Parse the upstream mapping. Any failure (network error, empty body,
    // non-JSON, unexpected shape) falls through to the default "premium"
    // entitlement so the app still unlocks instead of passing the original
    // locked response through.
    let productEntitlementMapping = null;
    if (error) {
        console.log("Error fetching data: ", error);
    } else {
        try {
            const ent = JSON.parse(data);
            productEntitlementMapping = ent && ent.product_entitlement_mapping;
        } catch (e) {
            console.log("Failed to parse response data: ", e);
        }
    }

//    console.log("Product Entitlement Mapping: ", JSON.stringify(productEntitlementMapping, null, 2));

    if (!productEntitlementMapping || Object.keys(productEntitlementMapping).length === 0) {
        console.log("No entitlements found, setting default to 'premium'");
        // Empty mapping breaks some apps; grant a generic "premium" entitlement.
        grant(subscriber, "premium", DEFAULT_PRODUCT_IDENTIFIER);
    } else {
        for (const [entitlementId, productInfo] of Object.entries(productEntitlementMapping)) {
            if (!productInfo) {
                continue;
            }

            const productIdentifier = productInfo.product_identifier || entitlementId;
            const entitlements = Array.isArray(productInfo.entitlements) ? productInfo.entitlements : [];

//            console.log(`Processing product: ${entitlementId}, Product Identifier: ${productIdentifier}`);

            for (const entitlement of entitlements) {
                grant(subscriber, entitlement, productIdentifier);
            }
        }

        // If the mapping existed but named no entitlements at all, still grant
        // a default so the app unlocks.
        if (Object.keys(subscriber.entitlements).length === 0) {
            console.log("Mapping contained no entitlements, setting default to 'premium'");
            grant(subscriber, "premium", DEFAULT_PRODUCT_IDENTIFIER);
        }
    }

//    console.log("Final JSON Response: ", JSON.stringify(jsonToUpdate, null, 2));

    const body = JSON.stringify(jsonToUpdate);
    $done({ body });
});
