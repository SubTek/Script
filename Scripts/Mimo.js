let body = {
  type: "max",
  isActive: true,
  subscriptions: [
    {
      source: "web",
      type: "max",
      isActive: true
    }
  ],
  hadFreeProTrial: false,
  source: "web",
  hadFreeMaxTrial: false
};

$done({ body: JSON.stringify(body) });
