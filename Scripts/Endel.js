var responseData = JSON.parse($response.body);

responseData.subscription = {
    "promo_type" : "DEFAULT",
    "period" : "YEAR",
    "store_trial" : false,
    "time_left" : 0,
    "price_id" : "12_Months_Instant_Offer",
    "valid_until" : 4092599349,
    "type" : "ACTIVE",
    "trial_type" : "CALENDAR_BASED",
    "prev_store" : "NOSTORE",
    "cancel_at_period_end" : false,
    "multiple_subscriptions" : false,
    "store" : "APP_STORE",
    "trial_canceled" : false
};

$done({body : JSON.stringify(responseData)});
