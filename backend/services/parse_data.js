const moment = require("moment");

const median = (numbers) => {
  const middle = (numbers.length + 1) / 2;
  const sorted = [...numbers].sort((a, b) => a - b);
  const isEven = sorted.length % 2 === 0;
  return isEven
    ? (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2
    : sorted[middle - 1];
};

const weekdayString = (num) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[num];
};

const getFilterType = (item, type) => {
  switch (type) {
    case "hours": {
      return moment(item.time).hour();
    }
    case "days": {
      return moment(item.time).dayOfYear();
    }
    case "weekdays": {
      const weekdayNum = moment(item.time).weekday();
      return weekdayString(weekdayNum);
    }
    case "weeks": {
      return moment(item.time).week();
    }
    default:
      throw new Error(`Something wrong type of: ${item}`);
  }
};

const getMedian = (rawArray, type) => {
  const data = {};
  const responseData = {};

  rawArray.forEach((item) => {
    const filterType = getFilterType(item, type);

    if (data[filterType] === undefined) {
      data[filterType] = [item.speed];
    } else {
      data[filterType].push(item.speed);
    }
  });

  Object.keys(data).forEach((key) => {
    const thisMedian = median(data[key]).toFixed(1);
    responseData[key] = Math.round(thisMedian * 1e2) / 1e2;
  });

  return responseData;
};

module.exports = { getMedian };
