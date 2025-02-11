//Credit to LMK
// Regex: ^https:\/\/api\.footpathapp\.com\/v2\/(store\/verify|me)$

// Handy helper
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// Now:
const now = Math.floor(new Date().valueOf());
const expires = now + (1000 * 60 * 60 * 24 * 907);
const older = now - (1000 * 60 * 60 * 24 * 7);

const original = JSON.parse($response.body);

const elite = original.elite;
if (elite) {
    elite.expiresAt = "2099-01-01T19:00:00.134Z";
    elite.joinedAt = "2024-01-01T19:00:00.134Z";
    elite.paidMonthCount = getRandomNumber(3, 9);
    elite.paidPeriodCount = 1;
    elite.productId = "com.ericrwolfe.Footpath.pro.sub";
    elite.productTitle = "Yearly";
    elite.tier = 0;
    elite.trialExpiresAt = "2099-01-01T19:00:00.134Z";
}

const patched = Object.assign({}, original, { elite });

const body = JSON.stringify(patched);
$done({ body, status: 200 });
