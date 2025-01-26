// Utility Functions
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate a random date in the format YYYY-MM-DDTHH:mm:ssZ
const getRandomDate = () => {
    const year = getRandomNumber(2015, 2025);
    const month = String(getRandomNumber(1, 12)).padStart(2, '0');
    const day = String(getRandomNumber(1, 28)).padStart(2, '0');
    const hour = String(getRandomNumber(0, 23)).padStart(2, '0');
    const minute = String(getRandomNumber(0, 59)).padStart(2, '0');
    const second = String(getRandomNumber(0, 59)).padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
};

// Constants
const baseUrl = "https://iosgods.com";
const photoPlaceholder = "data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220%200%201024%201024%22 style%3D%22background%3A%23c49762%22%3E%3Cg%3E%3Ctext text-anchor%3D%22middle%22 dy%3D%22.35em%22 x%3D%22512%22 y%3D%22512%22 fill%3D%22%23ffffff%22 font-size%3D%22700%22 font-family%3D%22-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif%22%3ET%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fsvg%3E";

// Body payload
const body = {
    achievements_points: getRandomNumber(100, 1000),
    allowAdminEmails: false,
    birthday: null,
    completed: true,
    coverPhotoUrl: "",
    customFields: {
        "2": {
            fields: {
                "12": { name: "iDevice", value: "" },
                "13": { name: "iOS Version", value: "" },
                "15": { name: "Facebook", value: "" },
                "16": { name: "Twitter", value: "" },
                "17": { name: "Game Center", value: "" },
                "18": { name: "Android Device", value: "" },
                "22": { name: "Donor", value: "1" },
                "24": { name: "Android Version", value: "" },
                "27": { name: "Jailbroken", value: "0" },
                "28": { name: "Rooted", value: "0" },
                "5": { name: "Gender", value: "0" },
                "6": { name: "Location", value: "" },
                "7": { name: "Interests", value: "" }
            },
            name: "Profile Information"
        },
        "3": {
            fields: {
                "19": { name: "About Me", value: "" }
            },
            name: "Profile Fields"
        }
    },
    formattedName: "<span style='color:#ffa700'><i class='fa fa-bolt'></i></span><span style='color:#b705b7;font-weight:bold'> patchyname</span>",
    id: getRandomNumber(139, 2449182),
    joined: getRandomDate(),
    lastPost: getRandomDate(),
    lastVisit: getRandomDate(),
    name: "patchyname",
    photoUrl: photoPlaceholder,
    photoUrlIsDefault: true,
    posts: getRandomNumber(1, 450),
    primaryGroup: {
        formattedName: "<span style='color:#ffa700'><i class='fa fa-bolt'></i></span><span style='color:#b705b7;font-weight:bold'> ViP Pro</span>",
        id: 19,
        name: "ViP Pro"
    },
    profileUrl: `${baseUrl}/profile/${getRandomNumber(2859, 25341)}-patchyname/`,
    profileViews: getRandomNumber(1, 75),
    rank: {
        icon: `${baseUrl}/uploads/monthly_2021_10/iOSGod_Apprentice.svg.8b843144cf6089e5708117a067f040ec.svg`,
        id: 41,
        name: "Apprentice",
        points: getRandomNumber(1, 1000)
    },
    reputationPoints: getRandomNumber(1, 1000),
    title: null
};

// Respond with the generated body and status 200
$done({ body: JSON.stringify(body) });
