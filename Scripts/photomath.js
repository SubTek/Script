var obj = JSON.parse($response.body);

obj = {
    'status': 'ok',
    'content': {
        'userId': '5ff8ad06e3981375695d0cad',
        'iam': 'Student',
        'pushConsent': true,
        'age': 18,
        'pushToken': 'yMvYSz6b13YEP3iJw0zqF14+eRDrH8U5R7DXlDqLxNY=',
        'country': 'IN',
        'type': 'anonymous',
        'provider': 'photomath',
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWJqZWN0IjoiUZCUom.v6',
        'refreshToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWJqZWN0IjoiUZCUom.v6',
        'scope': [
            'free:solution',
            'paid:solution',
            'trial:solution',
            'mypedia:solution',
            'wip:basic'
        ],
        'created': '2021-01-08T19:05:42.540Z',
        'updated': '2021-01-08T19:07:09.256Z',
        'providerIds': ['3D6C5575-193C-4C6D-908A-EFA6CAEC92A3'],
        'status': 'active',
        'tier': {
            'level': 'stringify',
            'added': '2021-01-08T19:05:42.540Z'
        },
        'region': 'MP',
        'subscription': {
            'packageName': 'com.microblink.PhotoMath',
            'productId': 'com.microblink.PhotoMath.purchase.gen',
            'orderId': '320000813070599',
            'expiry': '2025-01-15T19:07:03.000Z',
            'started': '2021-01-08T19:07:03.000Z',
            'autoRenewing': true,
            'status': 'active',
            'inGracePeriod': false
        },
        'rewardVideoAdCounter': 3
    },
    'geo': {
        'age': 13,
        'eu': false,
        'region': 'MP',
        'country': 'IN'
    }
};

$done({
    'body': JSON.stringify(obj)
});
