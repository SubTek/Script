//https://api.revenuecat.com/v1/(receipts|subscribers)/*

var body = $response.body;
var obj = JSON.parse(body);

obj.subscriber.entitlements = {
      "plus":{
              "expires_date":"2029-05-26T05:05:04Z",
              "product_identifier":"com.readdle.Scanner.subscription.year30",
              "purchase_date":"2022-04-09T05:05:04Z"
      }
  },
  
obj.subscriber.subscriptions ={
      "com.readdle.Scanner.subscription.year30":{
              "billing_issues_detected_at":null,
              "expires_date":"2029-05-26T05:05:04Z",
              "is_sandbox":false,
              "original_purchase_date":"2022-04-09T05:05:04Z",
              "period_type":"normal",
              "purchase_date":"2022-04-09T05:05:04Z",
              "store":"app_store",
              "unsubscribe_detected_at":null
      }
  }

body = JSON.stringify(obj);
$done({body});
