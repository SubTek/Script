var body = $response.body;
var response = JSON.parse(body);

response["subscription_status"] = "active";
response["plan"] = "premium";
response["is_premium"] = true;

body = JSON.stringify(response);
$done({ body });
