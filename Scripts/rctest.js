var request = $request;

// Simple logging function – adjust as needed for your environment.
function log(msg) {
  console.log("[DEBUG] " + msg);
  // Alternatively, if supported: $notify("[DEBUG]", "", msg);
}

const SPECIFIC_APP_1_CONDITION = "gentler.activity"; // Adjust with your actual identifier for App 1.
const SPECIFIC_APP_2_CONDITION = "pillow";             // Adjust with your actual identifier for App 2.

log("Received request URL: " + request.url);

if (request.url.includes(SPECIFIC_APP_1_CONDITION)) {
  log("Matched Specific App 1 condition.");
  
  if (typeof $response === "undefined") {
    log("No $response found – running request-phase logic for Specific App 1.");
    delete $request.headers["x-revenuecat-etag"];
    delete $request.headers["X-RevenueCat-ETag"];
    $done({ headers: $request.headers });
  } else {
    log("Response-phase for Specific App 1.");
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
    log("Updated response for Specific App 1: " + JSON.stringify(parsedResponse));
    $done({ body: JSON.stringify(parsedResponse) });
  }
  
} else if (request.url.includes(SPECIFIC_APP_2_CONDITION)) {
  log("Matched Specific App 2 condition.");
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
  log("Updated response for Specific App 2: " + JSON.stringify(obj));
  $done({ body: JSON.stringify(obj) });
  
} else {
  log("No specific app condition matched. Running default RevenueCat mapping flow.");
  const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
      'Authorization': request.headers["authorization"],
      'X-Platform': 'iOS',
      'User-Agent': request.headers["user-agent"]
    }
  };

  $httpClient.get(options, function(error, newResponse, data) {
    if (error) {
      log("HTTP GET error: " + error);
      // Optionally pass through the original response if an error occurs.
      $done({ body: $response ? $response.body : "{}" });
      return;
    }
    try {
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
      log("Default flow updated JSON: " + JSON.stringify(jsonToUpdate));
      $done({ body: JSON.stringify(jsonToUpdate) });
    } catch (e) {
      log("Error parsing RevenueCat data: " + e);
      $done({ body: $response ? $response.body : "{}" });
    }
  });
}
