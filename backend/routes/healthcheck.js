const healthcheck = require("express").Router();

healthcheck.get("/", async (req, res) => {
  res.status(200).end();
});

module.exports = healthcheck;
