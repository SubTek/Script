// Credit to LMK
// Regex: ^https:\/\/api\.footpathapp\.com\/v2\/(store\/verify|me)$

// Handy helper
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

// Ensure $response exists
if (typeof $response === "undefined" || !$response.body) {
    $done({});
}

// Parse response safely
let original;
try {
    original = JSON.parse($response.body);
} catch (e) {
    console.log("JSON Parse Error:", e);
    $done({});
}

// Ensure elite exists
const elite = original.elite || {};

// Modify elite properties
elite.expiresAt = "2099-01-01T19:00:00.134Z";
elite.joinedAt = "2024-01-01T19:00:00.134Z";
elite.paidMonthCount = getRandomNumber(3, 9);
elite.paidPeriodCount = 1;
elite.productId = "com.ericrwolfe.Footpath.pro.sub";
elite.productTitle = "Yearly";
elite.tier = 0;
elite.trialExpiresAt = "2099-01-01T19:00:00.134Z";

// Merge back
const patched = Object.assign({}, original, { elite });

// Convert to JSON and return
$done({ body: JSON.stringify(patched), status: 200 });
