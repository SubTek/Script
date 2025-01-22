const response = JSON.parse($response.body);

const modifiedResponse = {
    config: {
        paywall_video_duration_string: "Unlimited",
    },
    uid: "VIP_USER",
    max_photo_file_size: 10000000,
    supported_video_codecs: ["h264", "h265", "hevc", "vp9"],
    subscription_type: "VIP",
    max_video_file_size: 100000000,
    subscription_expiration_date: "2999-09-09T12:11:39Z",
    max_video_fps: 35,
    max_video_duration: 180,
    in_app_subscriptions: [
        {
            max_video_duration: 180,
            id: 12,
            external_id: "26",
            order: 1,
            name: "Lifetime VIP",
        },
        {
            max_video_duration: 180,
            id: 13,
            external_id: "27",
            order: 4,
            name: "Extended VIP",
        },
    ],
};

$done({ body: JSON.stringify(modifiedResponse) });
