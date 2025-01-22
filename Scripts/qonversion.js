var obj = JSON.parse($response.body);

obj.data.user_products = [
      {
        "id": "mommy",
        "type": 2,
        "store_id": "mommy",
        "duration": null
      }
    ];
obj.data.permissions = [
      {
        "id": "daddy",
        "trial_start_timestamp": 1707761885,
        "active": 1,
        "started_timestamp": 1707761885,
        "grant_type": "purchase",
        "associated_product": "mommy",
        "source": "appstore",
        "renews_count": 0,
        "store_transactions": [
          {
            "ownership_type": "owner",
            "transaction_id": "440001723859056",
            "environment": "production",
            "transaction_timestamp": 1707761885,
            "expiration_timestamp": 1708366685,
            "original_transaction_id": "440001723859056",
            "type": "trial_started"
          }
        ],
        "current_period_type": "trial",
        "expiration_timestamp": 1708366685,
        "renew_state": 1
      }
    ];


const first_id = Object.keys(obj.data.products_permissions)[0];
const first_value = obj.data.products_permissions[first_id][0];

obj.data.user_products[0].id = obj.data.products[0].id;
obj.data.user_products[0].store_id = obj.data.products[0].store_id;
obj.data.user_products[0].type = obj.data.products[0].type;
obj.data.user_products[0].duration = obj.data.products[0].duration;
obj.data.permissions[0].id = first_value;
obj.data.permissions[0].associated_product = obj.data.products[0].id;


body = JSON.stringify(obj);
$done({body});
