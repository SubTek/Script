var body = $response.body;
var json = JSON.parse(body);

json.data = {
    "active_sub_type": 2,
    "account_type": 1,
    "sub_type_name": "续期",
    "active_sub_order_id": "7069961436604422668",
    "trial_period_invalid_time": "324955080000000",
    "current_order_invalid_time": "",
    "active_order_id": "7069961436340181123",
    "limit_type": 0,
    "active_sub_type_name": "续期",
    "use_vip": true,
    "have_valid_contract": true,
    "derive_type_name": "普通会员",
    "derive_type": 1,
    "in_trial_period": false,
    "is_vip": true,
    "membership": {
        "id": "1230010086",
        "display_name": "Wink会员",
        "level": 1,
        "level_name": "普通会员"
    },
    "active_promotion_status_list": [2],
    "sub_type": 2,
    "account_id": "1230010086",
    "invalid_time": "324955295990000",
    "valid_time": "1569664800000",
    "active_product_id": "0",
    "active_promotion_status": 2,
    "show_renew_flag": true
};

$done({ body: JSON.stringify(json) });
