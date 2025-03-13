var obj = {
  "data": {
    "type": "adapty_analytics_profile",
    "id": $request.headers["adapty-sdk-profile-id"],
    "attributes": {
      "app_id": "20ed8826-ed31-44ad-a0b3-43c8d360d393",
      "profile_id": $request.headers["adapty-sdk-profile-id"],
      "total_revenue_usd": 0.0,
      "segment_hash": "f29021fa71267408",
      "paid_access_levels": {},
      "subscriptions": {},
      "non_subscriptions": null,
      "custom_attributes": {},
      "promotional_offer_eligibility": false,
      "introductory_offer_eligibility": false
    }
  }
};

const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const time = Date.now();
const list = {
  'ArtGenerator': { id: "yearly_premium_artgenerator", bundle_id: "co.appnation.artgenerator" },
  'KeyboardGPT': { id: "smart.keyboard.yearly.01", bundle_id: "com.smart.keyboard" },
  'SketchAR': { id: "tech.sketchar.subscription.yearly", bundle_id: "tech.sketchar.ios" },
  'universal': { id: "remotetv.yearly.01", bundle_id: "com.universal.remotetv" },
  'Lingvist': { id: "com.lingvist.unlimited_12_months.v11.full_1md_ft", bundle_id: "ee.keel24.Lingvist" },
  'ChatAI': { id: "chatai_yearly_ios", bundle_id: "com.scaleup.chatai" },
  'FacePlus': { id: "faceplus_yearly_subs_3dft_ios", bundle_id: "com.scaleup.faceplus" },
  'Batched': { id: "com.advasoft.batched.premium_year", bundle_id: "com.advasoft.batched" },
  'TVRemote': { id: "remotetv.weekly.02", bundle_id: "com.universal.remotetv" },
  'ScreenMirror': { id: "tv.screen.week.01", bundle_id: "tv.screen.mirroring" }
};

const premiumTemplate = {
  "id": "premium",
  "is_active": true,
  "is_lifetime": true,
  "expires_at": "2099-09-09T09:09:09.000000+0000",
  "starts_at": "2024-01-23T09:09:09.000000+0000",
  "will_renew": true,
  "vendor_product_id": "",
  "store": "app_store",
  "activated_at": "2024-01-23T09:09:09.000000+0000",
  "renewed_at": "2024-01-23T09:09:09.000000+0000",
  "is_in_grace_period": false,
  "active_introductory_offer_type": "free_trial",
  "is_sandbox": false,
  "vendor_transaction_id": "490001271881589",
  "vendor_original_transaction_id": "490001271881589",
  "is_refund": false
};

const receiptTemplate = {
  "quantity": "1",
  "purchase_date_ms": "1706000949000",
  "expires_date": "2099-09-09 09:09:09 Etc/GMT",
  "expires_date_pst": "2099-09-09 06:09:09 America/Los_Angeles",
  "is_in_intro_offer_period": "false",
  "transaction_id": "490001271881589",
  "is_trial_period": "true",
  "original_transaction_id": "490001271881589",
  "purchase_date": "2024-01-23 09:09:09 Etc/GMT",
  "original_purchase_date_pst": "2024-01-23 01:09:09 America/Los_Angeles",
  "in_app_ownership_type": "PURCHASED",
  "original_purchase_date_ms": "1706000949000",
  "web_order_line_item_id": "490000579504987",
  "expires_date_ms": "4092628149000",
  "purchase_date_pst": "2024-01-23 01:09:09 America/Los_Angeles",
  "original_purchase_date": "2024-01-23 09:09:09 Etc/GMT"
};

for (const key in list) {
  if (new RegExp(`^${key}`, `i`).test(ua)) {
    const { id, bundle_id } = list[key];

    obj.data.attributes.paid_access_levels[key] = Object.assign({}, premiumTemplate, {
      "id": key,
      "vendor_product_id": id
    });

    obj.data.attributes.subscriptions[id] = {
      "is_active": true,
      "is_lifetime": true,
      "expires_at": "2099-09-09T09:09:09.000000+0000",
      "starts_at": "2024-01-23T09:09:09.000000+0000",
      "will_renew": true,
      "vendor_product_id": id,
      "store": "app_store",
      "activated_at": "2024-01-23T09:09:09.000000+0000",
      "renewed_at": "2024-01-23T09:09:09.000000+0000",
      "is_in_grace_period": false
    };

    obj.data.attributes.receipt = {
      "receipt_type": "Production",
      "app_item_id": 1560806510,
      "receipt_creation_date": "2024-01-23 09:09:09 Etc/GMT",
      "bundle_id": bundle_id,
      "in_app": [Object.assign({}, receiptTemplate, { "product_id": id })],
      "original_purchase_date": "2024-01-23 09:09:09 Etc/GMT",
      "adam_id": 1560806510,
      "request_date": "2024-01-23 09:09:09 Etc/GMT",
      "version_external_identifier": 854389279,
      "application_version": "1"
    };

    obj.data.attributes.analytics = {
      "profile_id": $request.headers["adapty-sdk-profile-id"],
      "app_id": "20ed8826-ed31-44ad-a0b3-43c8d360d393",
      "bundle_id": bundle_id,
      "timestamp": time
    };

    break;
  }
}

body = JSON.stringify(obj);
$done({ body });
