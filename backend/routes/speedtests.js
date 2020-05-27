const speedTests = require("express").Router();
const SpeedTest = require("../models/speedtest");
const { getMedian } = require("../services/parse_data");
const { checkCache, setCache } = require("../utils/redis_client");

const getData = async (key) => {
  try {
    const result = await checkCache(key);
    if (result) {
      return result;
    }
    const rawData = await SpeedTest.find(
      {},
      { _id: 0, time: 1, speed: 1 }
    ).cache();
    const data = getMedian(rawData, key);
    setCache(key, data);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

speedTests.get("/hours", async (req, res) => {
  try {
    const data = await getData("hours");
    res.status(200).json(data);
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/days", async (req, res) => {
  try {
    const data = await getData("days");
    res.status(200).json(data);
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/weekdays", async (req, res) => {
  try {
    const data = await getData("weekdays");
    res.status(200).json(data);
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/weeks", async (req, res) => {
  try {
    const data = await getData("weeks");
    res.status(200).json(data);
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/months", async (req, res) => {
  try {
    const data = await getData("months");
    res.status(200).json(data);
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = speedTests;
