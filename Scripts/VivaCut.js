var obj = `{
  "code": 200,
  "data": {
    "hasFreedTrialProds": [
      "VivaCut_Yearly_Pro_9"
    ],
    "hasIntroOfferProds": [],
    "hasPurchasedProds": [
      "VivaCut_Yearly_Pro_9"
    ],
    "list": [
      {
        "autoRenewProductId": "VivaCut_Yearly_Pro_9",
        "autoRenewStatus": true,
        "endTime": 1741007726000,
        "isTrialPeriod": false,
        "orderId": "300001761396843",
        "orderStatus": 1,
        "originalOrderId": "300001761396843",
        "productId": "VivaCut_Yearly_Pro_9",
        "productType": 3,
        "sign": "c550d1d00e60dfd9a0c5600bd3fc7881",
        "startTime": 1709472572000
      }
    ],
    "systemDate": 1709472593574
  },
  "message": "successful",
  "success": true
}`;
$done({body: obj});
