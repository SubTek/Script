var objc = JSON.parse($response.body);

objc.p = 1;
objc.m = 1;
objc.s = 1;
objc.x = 0;

$done({ body: JSON.stringify(objc) });
