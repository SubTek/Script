var objc = JSON.parse($response.body);

objc = {
  "code": 0,
  "data": {
    "in_app_ownership_type": 0,
    "is_valid": true,
    "expires_date": 4076776750,
    "is_trial_period": false,
    "is_in_intro_offer_period": false,
    "status": 1,
    "pending_renewal_info": [
      {
        "auto_renew_product_id": "vip_1month_14.99dollars_3daysfreetrial",
        "auto_renew_status": "1",
        "original_transaction_id": "1300000004571976",
        "product_id": "vip_1month_14.99dollars_3daysfreetrial"
      }
    ]
  },
  "errmsg": "ok",
  "errno": 0,
  "msg": "ok"
}

$done({ body: JSON.stringify(objc) });
