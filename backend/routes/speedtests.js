const speedTests = require("express").Router();
const SpeedTest = require("../models/speedtest");
const { getMedian } = require("../services/parse_data");

const thirtyDays = 30 * 24 * 60 * 60 * 1000;

speedTests.get("/hours", async (req, res) => {
  try {
    const rawData = await SpeedTest.find(
      {
        time: {
          $gte: new Date(new Date().getTime() - thirtyDays),
        },
      },
      { _id: 0, time: 1, speed: 1 }
    );
    const data = getMedian(rawData, "hours");
    res.json(data);
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/days", async (req, res) => {
  try {
    const rawData = await SpeedTest.find();
    const data = getMedian(rawData, "days");
    res.json(data);
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/weekdays", async (req, res) => {
  try {
    const rawData = await SpeedTest.find(
      {
        time: {
          $gte: new Date(new Date().getTime() - thirtyDays),
        },
      },
      { _id: 0, time: 1, speed: 1 }
    );
    const data = getMedian(rawData, "weekdays");
    res.json(data);
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

speedTests.get("/weeks", async (req, res) => {
  try {
    const rawData = await SpeedTest.find();
    const data = getMedian(rawData, "weeks");
    res.json(data);
  } catch (err) {
    req.log.error(err.message);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = speedTests;
