var objc = JSON.parse($response.body);

objc.subscriptionStatus = 0;

$done({ body: JSON.stringify(objc) });
