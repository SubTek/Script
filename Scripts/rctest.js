var request = $request;

// Replace these with the actual URL substrings or conditions that identify the apps.
const SPECIFIC_APP_1_CONDITION = "gentler.activity";
const SPECIFIC_APP_2_CONDITION = "pillow";

if (request.url.includes(SPECIFIC_APP_1_CONDITION)) {
  // ----- Specific App 1 Unlocking (Based on Piece 2) -----
  if (typeof $response === "undefined") {
    // For a request-phase script: remove the ETag headers.
    delete $request.headers["x-revenuecat-etag"];
    delete $request.headers["X-RevenueCat-ETag"];
    $done({ headers: $request.headers });
  } else {
    // For a response-phase script: parse and update the response.
    const parsedResponse = JSON.parse($response.body);
    const subscriptionData = {
      "expires_date": "9999-09-09T09:09:09Z",
      "original_purchase_date": "2023-02-23T02:33:33Z",
      "purchase_date": "2023-02-23T02:33:33Z",
      "ownership_type": "PURCHASED",
      "store": "app_store"
    };

    parsedResponse.subscriber.subscriptions["app.gentler.activity.subscription.yearlyFamily2"] = subscriptionData;
    parsedResponse.subscriber.entitlements["premium"] = {
      ...subscriptionData,
      product_identifier: "app.gentler.activity.subscription.yearlyFamily2"
    };

    $done({ body: JSON.stringify(parsedResponse) });
  }
  
} else if (request.url.includes(SPECIFIC_APP_2_CONDITION)) {
  // This branch replaces the response entirely with a fixed object.
  var obj = JSON.parse($response.body);
  obj = {
    "request_date": "2022-08-06T02:30:14Z",
    "request_date_ms": 1837536263000,
    "subscriber": {
      "entitlements": {
        "premium": {
          "expires_date": "2023-08-06T02:30:14Z",
          "grace_period_expires_date": null,
          "product_identifier": "com.neybox.pillow.premium.month",
          "purchase_date": "2022-08-06T02:30:14Z"
        }
      },
      "first_seen": "2022-08-06T02:30:14Z",
      "last_seen": "2022-08-06T02:30:14Z",
      "management_url": null,
      "non_subscriptions": {},
      "original_app_user_id": "YOUR_USER_ID",
      "original_application_version": "YOUR_APP_VERSION",
      "original_purchase_date": "2022-08-06T02:30:14Z",
      "other_purchases": {},
      "subscriptions": {
        "com.neybox.pillow.premium.month": {
          "billing_issues_detected_at": null,
          "expires_date": "2099-08-06T02:30:14Z",
          "grace_period_expires_date": null,
          "is_sandbox": false,
          "original_purchase_date": "2022-08-06T02:30:14Z",
          "ownership_type": "PURCHASED",
          "period_type": "active",
          "purchase_date": "2022-08-06T02:30:14Z",
          "store": "app_store",
          "unsubscribe_detected_at": "2022-09-08T02:30:14Z"
        }
      }
    }
  };

  $done({ body: JSON.stringify(obj) });

} else {
  // ----- Default Flow Using RevenueCat Mapping -----
  const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
      'Authorization': request.headers["authorization"],
      'X-Platform': 'iOS',
      'User-Agent': request.headers["user-agent"]
    }
  };

  $httpClient.get(options, function(error, newResponse, data) {
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
    for (const [entitlementId, productInfo] of Object.entries(productEntitlementMapping)) {
      const productIdentifier = productInfo.product_identifier;
      const entitlements = productInfo.entitlements;
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

    $done({ body: JSON.stringify(jsonToUpdate) });
  });
}