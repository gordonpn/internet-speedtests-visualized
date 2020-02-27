let dataSource = './reader';
let data = require(dataSource);
let lastFetched = Date.now();

exports.hourlyAverage = (req, res) => {
    let currentTime = Date.now();
    console.log(`Hourly data requested at ${currentTime}`);
    getNewData();

    let map = new Map();
    let modifiedData = new Map();
    const entries = Object.entries(data);

    for (const [key, value] of entries) {
        if (!isRelevant(key)) {
            continue;
        }

        let hour = key.substring(key.indexOf('_') + 1, key.indexOf(':'));
        let minutes = parseInt(key.substring(key.indexOf(':') + 1, key.length));

        switch (true) {
            case minutes >= 39 && minutes >= 53:
                let fourthQuarter = hour + ":45";
                if (!map.has(fourthQuarter)) {
                    map.set(fourthQuarter, [value]);
                }
                map.get(fourthQuarter).push(value);
                break;
            case minutes >= 9 && minutes <= 23:
                let secondQuarter = hour + ":15";
                if (!map.has(secondQuarter)) {
                    map.set(secondQuarter, [value]);
                }
                map.get(secondQuarter).push(value);
                break;
            case minutes >= 24 && minutes <= 38:
                let thirdQuarter = hour + ":30";
                if (!map.has(thirdQuarter)) {
                    map.set(thirdQuarter, [value]);
                }
                map.get(thirdQuarter).push(value);
                break;
            default:
                let firstQuarter = hour + ":00";
                if (!map.has(firstQuarter)) {
                    map.set(firstQuarter, [value]);
                }
                map.get(firstQuarter).push(value);
                break;
        }
    }

    for (const [key, value] of map.entries()) {
        let sum = value.reduce((previous, current) => current += previous);
        let average = sum / value.length;
        modifiedData.set(key, average.toFixed(1));
    }

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
            modifiedData.set(currentItem, average.toFixed(1));
            currentSum = 0;
            count = 0;
        }
        index++;
    }
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
        if (!isRelevant(key)) {
            continue;
        }

        let currentDay = getWeekDay(key);

        if (!map.has(currentDay)) {
            map.set(currentDay, [value]);
        }
        map.get(currentDay).push(value);
    }

    for (const [key, value] of map.entries()) {
        let sum = value.reduce((previous, current) => current += previous);
        let average = sum / value.length;
        modifiedData.set(key, average.toFixed(1));
    }
    res.send(JSON.stringify([...new Map([...modifiedData.entries()])]));
};

function getNewData() {
    let currentTime = Date.now();

    if ((currentTime - lastFetched) > (60 * 60000)) {
        delete require.cache[require.resolve(dataSource)];
        console.log("Fetching new data");
        data = require(dataSource);
        lastFetched = Date.now();
    }
    console.log("Returning cached data");
}

function getWeekDay(rawString) {
    let date = rawString.substring(0, rawString.indexOf('_'));
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[new Date(date).getUTCDay()];
}

function isRelevant(rawString) {
    let dateNow = Date.now();
    let parsedDate = rawString.substring(0, rawString.indexOf('_'));
    let date = new Date(parsedDate).getTime();
    let daysDiff = (dateNow - date) / (1000 * 3600 * 24);
    return daysDiff <= 30;
}