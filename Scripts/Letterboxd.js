//credit to LMK

var request = $request;

const resbody = $response.body;

const original = JSON.parse(resbody);
var parsed = resbody;

// Define regex patterns and replacements
const patterns = [
    {
        find: /"suspended":\s?true/,
        replace: '"suspended": false',
    },
    {
        find: /"memberStatus":\s?"[^"]*"/,
        replace: '"memberStatus": "Patron"',
    },
    {
        find: /"hideAdsInContent":\s?false/,
        replace: '"hideAdsInContent": true',
    },
    {
        find: /"hideAds":\s?false/,
        replace: '"hideAds": true',
    },
    {
        find: /"showCustomPostersAds":\s?true/,
        replace: '"showCustomPostersAds": false',
    },
    {
        find: /"canSeePrivateViewings":\s?false/,
        replace: '"canSeePrivateViewings": true',
    },
    {
        find: /"accountStatus":\s?"[^"]*"/,
        replace: '"accountStatus": "Active"',
    },
];

// Apply replacements
patterns.forEach(pattern => {
    parsed = parsed.replace(pattern.find, pattern.replace);
});

body = parsed;
$done({ body });