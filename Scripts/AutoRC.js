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

// Fallback product identifier / entitlement for apps that report no mapping
// but still expect a named product on the entitlement.
const DEFAULT_PRODUCT_IDENTIFIER = "com.revenuecat.premium";
const DEFAULT_ENTITLEMENT = "premium";

// Full RevenueCat entitlement object. Includes every field common apps read
// (grace period, ownership, store) so validation passes across more apps.
function buildEntitlement(productIdentifier) {
    return {
        "expires_date": EXPIRES_DATE,
        "grace_period_expires_date": null,
        "product_identifier": productIdentifier,
        "purchase_date": PURCHASE_DATE,
        "original_purchase_date": PURCHASE_DATE,
        "is_sandbox": false,
        "ownership_type": "PURCHASED",
        "store": "app_store"
    };
}

// Full RevenueCat subscription object, matching the shape RevenueCat itself
// returns so apps that inspect billing/renewal fields still unlock.
function buildSubscription() {
    return {
        "billing_issues_detected_at": null,
        "expires_date": EXPIRES_DATE,
        "grace_period_expires_date": null,
        "is_sandbox": false,
        "original_purchase_date": PURCHASE_DATE,
        "ownership_type": "PURCHASED",
        "period_type": "normal",
        "purchase_date": PURCHASE_DATE,
        "refunded_at": null,
        "store": "app_store",
        "unsubscribe_detected_at": null,
        "auto_resume_date": null
    };
}

// Grant a single entitlement plus its backing subscription.
function grant(subscriber, entitlementId, productIdentifier) {
    subscriber.entitlements[entitlementId] = buildEntitlement(productIdentifier);
    subscriber.subscriptions[productIdentifier] = buildSubscription();
}

// An entitlement in the mapping may be a plain string or an object; normalise.
function entitlementName(entitlement) {
    if (typeof entitlement === "string") {
        return entitlement;
    }
    if (entitlement && typeof entitlement === "object") {
        return entitlement.identifier || entitlement.id || entitlement.entitlement_id || null;
    }
    return null;
}

// Flatten product_entitlement_mapping into {productIdentifier, entitlement}
// pairs, tolerating the shapes RevenueCat has used across API versions:
//   - object map:   { "<product_id>": { product_identifier, entitlements: [...] } }
//   - products list: { products: [ { id | product_identifier, entitlements: [...] } ] }
// Entitlements may be strings or objects in either shape.
function collectGrants(mapping) {
    const grants = [];
    if (!mapping || typeof mapping !== "object") {
        return grants;
    }

    const entries = Array.isArray(mapping.products)
        ? mapping.products.map(function (p) { return [p && (p.id || p.product_identifier), p]; })
        : Object.entries(mapping);

    for (const [key, info] of entries) {
        if (!info || typeof info !== "object") {
            continue;
        }
        const productIdentifier = info.product_identifier || info.id || key;
        if (!productIdentifier) {
            continue;
        }
        const list = Array.isArray(info.entitlements) ? info.entitlements : [];
        for (const raw of list) {
            const ent = entitlementName(raw);
            if (ent) {
                grants.push({ productIdentifier: productIdentifier, entitlement: ent });
            }
        }
    }
    return grants;
}

// If the intercepted request targets /subscribers/<id>, echo that app_user_id
// back so apps that cross-check the returned id still accept the response.
function extractAppUserId(url) {
    if (!url) {
        return null;
    }
    const match = String(url).match(/\/subscribers\/([^\/?#]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

// Debugging: Log API request options
//console.log("API Request Options: ", JSON.stringify(options, null, 2));

$httpClient.get(options, function (error, newResponse, data) {
    const now = new Date();
    const appUserId = extractAppUserId(request.url) || "70B24288-83C4-4035-B001-573285B21AE2";

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
            "original_app_user_id": appUserId,
            "non_subscriptions": {}
        }
    };

    const subscriber = jsonToUpdate.subscriber;

    // Parse the upstream mapping. Any failure (network error, empty body,
    // non-JSON, unexpected shape) falls through to the default entitlement so
    // the app still unlocks instead of passing the original locked response.
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

    const grants = collectGrants(productEntitlementMapping);

    if (grants.length === 0) {
        console.log("No entitlements found, setting default to '" + DEFAULT_ENTITLEMENT + "'");
        // Empty/unknown mapping breaks some apps; grant a generic entitlement.
        grant(subscriber, DEFAULT_ENTITLEMENT, DEFAULT_PRODUCT_IDENTIFIER);
    } else {
        for (const g of grants) {
//            console.log("Granting entitlement: " + g.entitlement + " (" + g.productIdentifier + ")");
            grant(subscriber, g.entitlement, g.productIdentifier);
        }
    }

//    console.log("Final JSON Response: ", JSON.stringify(jsonToUpdate, null, 2));

    const body = JSON.stringify(jsonToUpdate);
    $done({ body });
});
