const speedTests = require("express").Router();
const SpeedTest = require("../models/speedtest");
const { getMedian } = require("../services/parse_data");
const { checkCache, setCache } = require("../utils/redis_client");

speedTests.get("/hours", async (req, res) => {
  try {
    const result = await checkCache("hours");
    if (result) {
      res.status(200).json(result);
    } else {
      const rawData = await SpeedTest.find(
        {},
        { _id: 0, time: 1, speed: 1 }
      ).cache();
      const data = getMedian(rawData, "hours");
      setCache("hours", data);
      res.json(data);
    }
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/days", async (req, res) => {
  try {
    const result = await checkCache("days");
    if (result) {
      res.status(200).json(result);
    } else {
      const rawData = await SpeedTest.find(
        {},
        { _id: 0, time: 1, speed: 1 }
      ).cache();
      const data = getMedian(rawData, "days");
      setCache("days", data);
      res.json(data);
    }
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/weekdays", async (req, res) => {
  try {
    const result = await checkCache("weekdays");
    if (result) {
      res.status(200).json(result);
    } else {
      const rawData = await SpeedTest.find(
        {},
        { _id: 0, time: 1, speed: 1 }
      ).cache();
      const data = getMedian(rawData, "weekdays");
      setCache("weekdays", data);
      res.json(data);
    }
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/weeks", async (req, res) => {
  try {
    const result = await checkCache("weeks");
    if (result) {
      res.status(200).json(result);
    } else {
      const rawData = await SpeedTest.find(
        {},
        { _id: 0, time: 1, speed: 1 }
      ).cache();
      const data = getMedian(rawData, "weeks");
      setCache("weeks", data);
      res.json(data);
    }
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/months", async (req, res) => {
  try {
    const result = await checkCache("months");
    if (result) {
      res.status(200).json(result);
    } else {
      const rawData = await SpeedTest.find(
        {},
        { _id: 0, time: 1, speed: 1 }
      ).cache();
      const data = getMedian(rawData, "months");
      setCache("months", data);
      res.json(data);
    }
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = speedTests;
