let response = JSON.parse($response.body);

let premiumFeatures = [
    'smart-alarm',
    'sleep-aid',
    'snore',
    'sleep-notes',
    'premium-sounds',
    'wake-up-mood',
    'google-fit',
    'philips-hue',
    'weekly-report',
    'sleep-training',
    'syndicate',
    'sleep-gpt'
];

response.subscription = {
    product_id: 'com.lexwarelabs.goodmorning.premium',
    status: 'active',
    package_id: 'premium',
    features: premiumFeatures.map(feature => ({
        source: 'script',
        name: feature,
        source_value: 'enabled',
        expire_date: 4102444800
    })),
    all_features: premiumFeatures,
    expire_date: 4102444800
};

$done({ body: JSON.stringify(response) });
