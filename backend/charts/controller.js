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

    let modifiedData = new Map();
    const entries = Object.entries(data);
    let index = 0;
    let currentSum = 0;
    let count = 0;

    for (const [key, value] of entries) {
        let currentItem = key.substring(0, key.indexOf('_'));
        let nextItem = "";

        if (index < entries.length - 1) {
            nextItem = entries[index + 1][0].substring(0, key.indexOf('_'));
        }

        currentSum += value;
        count++;

        if (currentItem !== nextItem) {
            let average = currentSum / count;
            modifiedData.set(currentItem, average);
            currentSum = 0;
            count = 0;
        }
        index++;
    }
    lastFetched = Date.now();
    res.send(JSON.stringify([...new Map([...modifiedData.entries()].sort())]));
};

exports.weeklyAverage = (req, res) => {
    let currentTime = Date.now();
    console.log(`Weekly date requested at ${currentTime}`);
    getNewData();

    let modifiedData = new Map();
    const entries = Object.entries(data);

    lastFetched = Date.now();
    res.send(JSON.stringify([...new Map([...modifiedData.entries()].sort())]));
};

function getNewData() {
    let currentTime = Date.now();

    if ((currentTime - lastFetched) > (60 * 60000)) {
        console.log("Fetching new data");
        data = require('./reader');
    } else {
        console.log("Returning cached data");
    }
}