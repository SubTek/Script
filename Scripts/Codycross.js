// Regex: ^https:\/\/game\.codycross.*\/(Reward\/Claim\/.*|reward\/claim\/you_won|Powerup\/Consume|Player\/AppAberto|streak\/puzzlecomplete|subscription\/get|shorttrackevent\/playereventprogress|shorttrackevent\/.*progresso|shorttrackevent\/collectchest|shorttrackevent\/buyenergy)$

var request = $request;

const resbody = $response.body;

const original = JSON.parse(resbody);
original.Message = "InjectedByThirs";

original.Ok = true;
original.Status = 0;

if ($request.url.includes("subscription/get")) {
    const record = {
        "FreeTrialAvailable": false,
        "IsInviteRewardSubscriber": false,
        "TimeToExpiration": "99.23:49:05.1037969"
    };
    original.Records = [record];
}

var parsed = JSON.stringify(original);

const regex = /"Powerups":\s*{[^}]*}/g;
const regex2 = /"Coins":\s*\d+/g;
const regex3 = /"Buyer":\s*(true|false)/g;
const regex4 = /"PassExpiration":\s*-?\d+/g;
const regex5 = /"SubscriptionExpiration":\s*-?\d+/g;
const regex6 = /"TimeToExpiration":\s*(null|-?\d+)/g;
const regex7 = /"CurrentEnergy":\s*\d+/g;

parsed = parsed.replace(regex, '"Powerups": { "4": 1500, "2": 1500, "3": 1500, "1": 1500 }');
parsed = parsed.replace(regex2, '"Coins": 20000');
parsed = parsed.replace(regex3, '"Buyer": true');
parsed = parsed.replace(regex4, '"PassExpiration": 0');
parsed = parsed.replace(regex5, '"SubscriptionExpiration": 0');
parsed = parsed.replace(regex6, '"TimeToExpiration": 3295803');
parsed = parsed.replace(regex7, '"CurrentEnergy": 3');

body = parsed;
$done({ body });
