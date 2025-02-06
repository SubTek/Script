var body = $response.body;
var obj = JSON.parse(body);

obj = {
    "result": {
      "serverDate": {
        "__type": "Date",
        "iso": "2025-01-24T08:16:11.477Z"
      },
      "subscriptions": [
        {
          "userId": "6FFEA015-FEDE-440A-B669-0D45AFCF9478",
          "orderId": "30001933369528",
          "packageName": "com.grailr.CARROTweather",
          "appPurchaseTime": "1733137075000",  // Adjusted
          "appStartingVersion": "5.12.9.0",
          "receipt": "MIT",
          "productId": "com.grailr.carrotWeather.premiumFamily1year",
          "purchaseTime": 1738014480000,  // Adjusted
          "originalPurchaseTime": 1738014481000,  // Adjusted
          "expirationTime": "1779544680000",  // Adjusted
          "in_app_ownership_type": "PURCHASED",
          "expirationReason": null,
          "isInBillingRetryPeriod": null,
          "autoRenewStatus": 1,
          "cancellationDate": null,
          "cancellationReason": null,
          "priceConsentStatus": null,
          "gracePeriodExpiresTime": null,
          "isTrialPeriod": null,
          "status": 0,
          "service": "apple",
          "environment": "Production",
          "createdAt": "2025-01-23T07:48:07.554Z",
          "updatedAt": "2025-01-24T07:24:51.399Z",
          "deviceId": [
            "WfjT0vx1hx",
            "pPsiN1AKdt"
          ],
          "lastNotification": "DID_CHANGE_RENEWAL_STATUS",
          "lastNotificationDate": {
            "__type": "Date",
            "iso": "2026-01-24T11:47:39.182Z"
          },
          "objectId": "m5JpZFig4u",
          "__type": "Object",
          "className": "Subscription"
        }
      ]
    }
  };

body = JSON.stringify(obj);
$done({body});
