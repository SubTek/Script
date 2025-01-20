var objc = JSON.parse($response.body);


if (objc.bundleId = "com.readdle.ReaddleDocsIPad") {
    objc.inAppStates = [
        {
            "type": "subscription",
            "productId": "com.readdle.ReaddleDocsIPad.subscription.month10_bf22",
            "originalTransactionId": 300001771014202,
            "subscriptionGroupId": "20555224",
            "productName": "subscription",
            "isEligibleForIntroPeriod": false,
            "subscriptionExpirationDate": "12:17 13/04/2099 ",
            "subscriptionExpirationTimestamp": 4077088262,
            "subscriptionState": "trial",
            "subscriptionAutoRenewStatus": "autoRenewOn",
            "isInGracePeriod": false,
            "isInBillingRetryPeriod": false,
            "entitlements": [
            "ios.documents.pdf"
            ]
        }
    ];
} else if (objc.bundleId = "com.readdle.PDFExpert5") {
    objc.inAppStates = [
        {
            "type": "subscription",
            "productId": "com.readdle.PDFExpert5.subscription.year50BMI_rollout",
            "originalTransactionId": 300001771036219,
            "subscriptionGroupId": "20537380",
            "productName": "subscription",
            "isEligibleForIntroPeriod": false,
            "subscriptionExpirationDate": "12:44 20/03/2099",
            "subscriptionExpirationTimestamp": 4077088262,
            "subscriptionState": "trial",
            "subscriptionAutoRenewStatus": "autoRenewOn",
            "isInGracePeriod": false,
            "isInBillingRetryPeriod": false,
            "entitlements": [
              "ios.pe.ai-features",
              "ios.pe.subscription.pdf-features"
            ]
          }
    ];
} else if (objc.bundleId = "com.readdle.CalendarsLite") {

    objc.inAppStates = [
        {
            "type": "subscription",
            "productId": "com.readdle.CalendarsLite.subscription.year20trial7",
            "originalTransactionId": 300001771040213,
            "subscriptionGroupId": "20370066",
            "productName": "subscription",
            "isEligibleForIntroPeriod": false,
            "subscriptionExpirationDate": "12:49 20/03/2099",
            "subscriptionExpirationTimestamp": 4077088262,
            "subscriptionState": "trial",
            "subscriptionAutoRenewStatus": "autoRenewOn",
            "isInGracePeriod": false,
            "isInBillingRetryPeriod": false,
            "entitlements": []
          }
    ];
}

$done({ body: JSON.stringify(objc) });
