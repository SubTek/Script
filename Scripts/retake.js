//Credit to LMK
// Regex: ^https:\/\/purchase-verifier\.cdwapi\.com\/ios$

// Handy helper
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// Now:
const now = Math.floor(new Date().valueOf());
const expires = now + (1000 * 60 * 60 * 24 * 907);

const patched = {
    "status": "success",
    "payload": {
        "subscriptionPlatform": "ios",
        "started_at": now,
        "expires_at": expires,
        "latest_transaction_time": now,
        "product_id": "youapp.pro.7daytrial.1week.t8",
        "subscription_id": `${getRandomNumber(730000000256000, 730000009999999)}`,
        "latest_transaction_id": `${getRandomNumber(730000000256000, 730000009999999)}`,
        "is_renewal": false,
        "is_resubscribe": false,
        "is_trial": true,
        "active": true,
        "is_in_grace": false,
        "grace_expires_at": null,
        "purchased_product_identifiers": ["youapp.pro.7daytrial.1week.t8"],
        "is_family_share": false,
        "is_intro_offer": true,
        "renewal_week": 0,
        "auto_renew_status": "1",
        "isActive": true,
        "startTimeMillis": now,
        "expiresAt": expires,
        "productId": "youapp.pro.7daytrial.1week.t8",
        "isInGrace": false
    }
};

const body = JSON.stringify(patched);
$done({ body, status: 200 });
