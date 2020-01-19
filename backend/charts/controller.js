let dataSource = './reader';
let data = require(dataSource);
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

    let map = new Map();
    let modifiedData = new Map();
    const entries = Object.entries(data);

    for (const [key, value] of entries) {
        let currentDate = key.substring(0, key.indexOf('_'));
        let currentDay = getWeekDay(currentDate);

        if (!map.has(currentDay)) {
            map.set(currentDay, [value]);
        }
        map.get(currentDay).push(value);
    }

    for (const [key, value] of map.entries()) {
        let sum = value.reduce((previous, current) => current += previous);
        let average = sum / value.length;
        modifiedData.set(key, average);
    }

    lastFetched = Date.now();
    res.send(JSON.stringify([...new Map([...modifiedData.entries()])]));
};

function getNewData() {
    let currentTime = Date.now();

    if ((currentTime - lastFetched) > (60 * 60000)) {
        delete require.cache[require.resolve(dataSource)];
        console.log("Fetching new data");
        data = require(dataSource);
    }
    console.log("Returning cached data");
}

function getWeekDay(date) {
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[new Date(date).getUTCDay()];
}