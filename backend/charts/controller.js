let data = require('./reader');
let lastFetched = Date.now();

exports.hourlyAverage = (req, res) => {
    let currentTime = Date.now();
    console.log(`Hourly data requested at ${currentTime}`);
    getNewData();

    let modifiedData = new Map();
    const entries = Object.entries(data);

    for (const [key, value] of entries) {
        modifiedData.set(key.substring(key.indexOf('_') + 1, key.length), value);
    }

    lastFetched = Date.now();
    res.send(JSON.stringify([...new Map([...modifiedData.entries()].sort())]));
};

exports.dailyAverage = (req, res) => {
    let currentTime = Date.now();
    console.log(`Daily date requested at ${currentTime}`);
    getNewData();

};

exports.weeklyAverage = (req, res) => {
    let currentTime = Date.now();
    console.log(`Weekly date requested at ${currentTime}`);
    getNewData();

};

function getNewData() {
    let currentTime = Date.now();

    if ((currentTime - lastFetched) > (20 * 60000)) {
        console.log("Fetching new data");
        data = require('./reader');
    } else {
        console.log("Returning cached data");
    }
}