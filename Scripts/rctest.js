if (typeof $response === "undefined") {
  // ----- Request Phase: Scalable for multiple applications -----
  var request = $request;

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
      $done({ body: JSON.stringify({ error: error }) });
      return;
    }

    let ent = {};
    try {
      ent = JSON.parse(data);
    } catch (e) {
      $done({ body: data });
      return;
    }

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

    // Loop over each entitlement mapping and add subscriptions/entitlements dynamically.
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

        // Add subscription info for the product
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
} else {
  // ----- Response Phase: Append specific app subscription while retaining all others -----
  const responsePayload = {};
  const parsedResponse = JSON.parse($response.body || null);

  // These variables are specific to the app in question.
  const entitlementName = "premium";
  const subscriptionId = "app.gentler.activity.subscription.yearlyFamily2";

  if (!parsedResponse || !parsedResponse.subscriber) {
    // In case subscriber data isn't available, clean up ETag headers.
    delete $request.headers["x-revenuecat-etag"];
    delete $request.headers["X-RevenueCat-ETag"];
    responsePayload.headers = $request.headers;
  } else {
    // Define subscription data as specified for the given app.
    const subscriptionData = {
      "expires_date": "9999-09-09T09:09:09Z",
      "original_purchase_date": "2023-02-23T02:33:33Z",
      "purchase_date": "2023-02-23T02:33:33Z",
      "ownership_type": "PURCHASED",
      "store": "app_store"
    };

    // Add (or override) the subscription and corresponding entitlement for the specific app.
    parsedResponse.subscriber.subscriptions[subscriptionId] = subscriptionData;
    parsedResponse.subscriber.entitlements[entitlementName] = {
      ...subscriptionData,
      product_identifier: subscriptionId
    };

    // This response now contains both the dynamically built subscriptions from the request phase
    // and the extra subscription for the specific app.
    responsePayload.body = JSON.stringify(parsedResponse);
  }
  $done(responsePayload);
}
