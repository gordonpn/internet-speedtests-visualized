const speedTests = require("express").Router();
const SpeedTest = require("../models/speedtest");

speedTests.get("/hours", async (req, res) => {
  try {
    const data = await SpeedTest.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
speedTests.get("/days", (req, res) => {});
speedTests.get("/weekdays", (req, res) => {});
speedTests.get("/weeks", (req, res) => {});

module.exports = speedTests;
