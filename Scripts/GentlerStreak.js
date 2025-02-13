const responsePayload = {};
const parsedResponse = JSON.parse(typeof $response !== "undefined" && $response.body || null);

const entitlementName = "premium";
const subscriptionId = "app.gentler.activity.subscription.yearlyFamily2";

if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];

  responsePayload.headers = $request.headers;
} else if (parsedResponse && parsedResponse.subscriber) {
  const subscriptionData = {
    "expires_date": "9999-09-09T09:09:09Z",
    "original_purchase_date": "2023-02-23T02:33:33Z",
    "purchase_date": "2023-02-23T02:33:33Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };

  parsedResponse.subscriber.subscriptions[subscriptionId] = subscriptionData;
  parsedResponse.subscriber.entitlements[entitlementName] = { 
    ...subscriptionData, 
    product_identifier: subscriptionId 
  };

  responsePayload.body = JSON.stringify(parsedResponse);
}

$done(responsePayload);