var objc = JSON.parse($response.body);

objc.data.ValidatePremium.isSuccessful = true;

$done({ body: JSON.stringify(objc) });
