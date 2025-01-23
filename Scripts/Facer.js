// ^https:\/\/.*facer\.io\/parse\/(functions\/(getWatchface|getSubscriptionStatus|isAdmin)|users\/me|functions\/fetchUser)

var request = $request;

const resbody = $response.body;

const original = JSON.parse(resbody);
var parsed = JSON.stringify(original);

// Define regex patterns and replacements
const patterns = [
    // {
    //     match: /^https:\/\/www\.facer.*\/parse\/functions\/getWatchface/,
    //     find: /"is_protected":.*true,/,
    //     replace: '"is_protected": false,'
    // },
    // {
    //     match: /^https:\/\/www\.facer.*\/parse\/functions\/getWatchface/,
    //     find: /"premium":true,/,
    //     replace: '"premium":false,'
    // },
    {
        match: /^https:\/\/www\.facer.*\/parse\/functions\/getSubscriptionStatus/,
        find: /.*/,
        replace: '{"result":{"isActive":true,"hasFreeTrial":true}}'
    },
    {
        match: /^https:\/\/api\.facer.*\/parse\/functions\/fetchUser/,
        find: /"rolesxArray":\[\]/,
        replace: '"rolesArray":["admin","premium"]'
    },
    {
        match: /^https:\/\/facer.*\/parse\/users\/me/,
        find: /"rolesxArray": \[\],/,
        replace: '"rolesArray":["admin","premium"]'
    },
    {
        match: /^https:\/\/www\.facer.*\/parse\/functions\/isAdmin/,
        find: /^.*/,
        replace: '{ "result": { "isAdmin": true } }'
    }
];

// Apply replacements
patterns.forEach(pattern => {
    if (pattern.match.test(request.url)) {
        parsed = parsed.replace(pattern.find, pattern.replace);
    }
});

body = parsed;
$done({ body });
