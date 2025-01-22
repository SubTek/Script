var objc = JSON.parse($response.body);

objc = {
    "ads_disabled": true,
    "is_premium": true,
    "used_free_trial": true,
    "credits": 69420,
    "provider": "apple",
    "end_date": "2099-03-18T22:59:21Z",
    "subscriptionId": "subscription_yearly",
    "provider_plan_id": "subscription_yearly",
    "provider_subscription_id": "300001768754820",
    "cancelled": false,
    "is_trial": false
  }

$done({ body: JSON.stringify(objc) });
