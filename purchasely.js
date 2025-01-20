var objc = JSON.parse($response.body);

objc = {
    "active_subscriptions": [
      {
        "id": "6faeb1c7-3280-44dc-99d8-8a534bf61d07",
        "public_id": "subs_dgzM9hRmYu2oRfIaXzsPuDEtImSrLy",
        "content_id": null,
        "environment": "PRODUCTION",
        "is_family_shared": false,
        "offer_identifier": null,
        "offer_type": "FREE_TRIAL",
        "plan_id": "908407a8-01cc-475f-9f56-0a04a0261768",
        "purchase_token": null,
        "purchased_at": "2024-03-12T21:32:26Z",
        "store_country": "US",
        "store_type": "APPLE_APP_STORE",
        "cancelled_at": null,
        "next_renewal_at": "2099-03-19T21:32:26Z",
        "original_purchased_at": "2024-03-12T21:32:27Z",
        "subscription_status": "AUTO_RENEWING"
      }
    ],
    "non_consumables": []
  }

$done({ body: JSON.stringify(objc) });
