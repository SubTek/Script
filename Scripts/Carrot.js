// More creative way up updating the date by LMK

var body = $response.body;
var obj = JSON.parse(body);

const date = new Date();
const timestamp = date.getTime();
const exp = timestamp + (365 * 24 * 60 * 60 * 1000);

obj = {
    "result": {
      "serverDate": {
        "__type": "Date",
        "iso": date.toISOString(),
      },
      "subscriptions": [
        {
          "userId": "6FFEA015-FEDE-440A-B669-0D45AFCF9478",
          "orderId": "30001933369528",
          "packageName": "com.grailr.CARROTweather",
          "appPurchaseTime": "1701601075000",
          "appStartingVersion": "5.12.9.0",
          "receipt": "MIT",
          "productId": "com.grailr.carrotWeather.premiumFamily1year",
          "purchaseTime": timestamp,
          "originalPurchaseTime": timestamp,
          "expirationTime": `${exp}`,
          "in_app_ownership_type": "PURCHASED",
          "expirationReason": null,
          "isInBillingRetryPeriod": null,
          "autoRenewStatus": 0,
          "cancellationDate": null,
          "cancellationReason": null,
          "priceConsentStatus": null,
          "gracePeriodExpiresTime": null,
          "isTrialPeriod": null,
          "status": 0,
          "service": "apple",
          "environment": "Production",
          "createdAt": date.toISOString(),
          "updatedAt": date.toISOString(),
          "deviceId": [
            "WfjT0vx1hx",
            "pPsiN1AKdt"
          ],
          "lastNotification": "DID_CHANGE_RENEWAL_STATUS",
          "lastNotificationDate": {
            "__type": "Date",
            "iso": date.toISOString(),
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
