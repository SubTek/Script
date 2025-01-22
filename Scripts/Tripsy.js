var objc = JSON.parse($response.body);

const requestUrl = $request.url;

if (requestUrl.includes("https://firstclass.tripsy.app/api/v1/receipt/update") || 
    requestUrl.includes("firstclass.tripsy.app/api/v1/receipt/update")) {
    
    objc.is_premium = true;
    objc.is_trial = true;
    objc.expiration_date = "2099-09-09T09:09:09Z";

} else if (requestUrl.includes("https://firstclass.tripsy.app/api/v1/me")) {
    
    objc.is_premium = true;
    objc.premium_expiration_date = "2099-09-09T09:09:09Z";
}

$done({ body: JSON.stringify(objc) });
