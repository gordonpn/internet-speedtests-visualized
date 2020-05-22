const dataSource = "./reader";
let data = require(dataSource);
let lastFetched = Date.now();
const { logger } = require("../server.js");

/*
todo
connect to mongodb
how to rate rate limit
cache (with redis maybe)
*/

exports.hourlyAverage = (req, res) => {
  const currentTime = Date.now();
  logger.debug(`Hourly data requested at ${currentTime}`);
  getNewData();

  const map = new Map();
  const modifiedData = new Map();
  const entries = Object.entries(data);

  for (const [key, value] of entries) {
    if (!isRelevant(key)) {
      continue;
    }

    const hour = key.substring(key.indexOf("_") + 1, key.indexOf(":"));

    let graphHour = hour + ":00";
    if (!map.has(graphHour)) {
      map.set(graphHour, [value]);
    } else {
      map.get(graphHour).push(value);
    }
  }

  for (const [key, value] of map.entries()) {
    const sum = value.reduce((previous, current) => current + previous, 0);
    const average = sum / value.length;
    modifiedData.set(key, average.toFixed(1));
  }

  res.send(JSON.stringify([...new Map([...modifiedData.entries()].sort())]));
};

exports.dailyAverage = (req, res) => {
  const currentTime = Date.now();
  logger.debug(`Daily date requested at ${currentTime}`);
  getNewData();

  const modifiedData = new Map();
  const entries = Object.entries(data);
  let index = 0;
  let currentSum = 0;
  let count = 0;

  for (const [key, value] of entries) {
    const currentItem = key.substring(0, key.indexOf("_"));
    let nextItem = "";

    if (index < entries.length - 1) {
      nextItem = entries[index + 1][0].substring(0, key.indexOf("_"));
    }

    currentSum += value;
    count++;

    if (currentItem !== nextItem) {
      const average = currentSum / count;
      modifiedData.set(currentItem, average.toFixed(1));
      currentSum = 0;
      count = 0;
    }
    index++;
  }
  res.send(JSON.stringify([...new Map([...modifiedData.entries()].sort())]));
};

exports.weeklyAverage = (req, res) => {
  const currentTime = Date.now();
  logger.debug(`Weekly date requested at ${currentTime}`);
  getNewData();

  const map = new Map();
  const modifiedData = new Map();
  const entries = Object.entries(data);

  for (const [key, value] of entries) {
    if (!isRelevant(key)) {
      continue;
    }

    const currentDay = getWeekDay(key);

    if (!map.has(currentDay)) {
      map.set(currentDay, [value]);
    }
    map.get(currentDay).push(value);
  }

  for (const [key, value] of map.entries()) {
    const sum = value.reduce((previous, current) => (current += previous));
    const average = sum / value.length;
    modifiedData.set(key, average.toFixed(1));
  }
  res.send(JSON.stringify([...new Map([...modifiedData.entries()])]));
};

function getNewData() {
  const currentTime = Date.now();

  if (currentTime - lastFetched > 60 * 60000) {
    delete require.cache[require.resolve(dataSource)];
    logger.debug("Fetching new data");
    data = require(dataSource);
    lastFetched = Date.now();
  }
  logger.debug("Returning cached data");
}

function getWeekDay(rawString) {
  const date = rawString.substring(0, rawString.indexOf("_"));
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[new Date(date).getUTCDay()];
}

function isRelevant(rawString) {
  const dateNow = Date.now();
  const parsedDate = rawString.substring(0, rawString.indexOf("_"));
  const date = new Date(parsedDate).getTime();
  const daysDiff = (dateNow - date) / (1000 * 3600 * 24);
  return daysDiff <= 30;
}
