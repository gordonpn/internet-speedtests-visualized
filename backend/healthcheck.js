const http = require("http");
const pino = require("pino");

require("dotenv").config();

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});

const options = {
  host: "localhost",
  port: process.env.PORT || 3000,
  timeout: 2000,
  method: "GET",
  path: "/api/health/",
};

const request = http.request(options, (result) => {
  logger.info(`Performed health check, result ${result.statusCode}`);
  if (result.statusCode < 400) {
    process.exitCode = 0;
  } else {
    process.exitCode = 1;
  }
});

request.on("error", (err) => {
  logger.error(
    `An error occurred while performing health check, error: ${err}`
  );
  process.exitCode = 1;
});

request.end();
