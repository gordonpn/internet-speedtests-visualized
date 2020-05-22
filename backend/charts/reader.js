const fs = require("fs");
const { logger } = require("../server.js");

function getLatestData() {
  try {
    const jsonString = fs.readFileSync("../data.json");
    logger.debug(`Successfully read data.json at ${Date.now()}`);
    return JSON.parse(jsonString);
  } catch (e) {
    logger.debug(`Error parsing JSON string: ${e}`);
    return {};
  }
}

module.exports = getLatestData();
