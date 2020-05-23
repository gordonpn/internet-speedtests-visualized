const express = require("express");
const pino = require("pino");
const expressPino = require("express-pino-logger");
const { connectDb } = require("./models/index");
const routes = require("./routes/index");
require("dotenv").config();
require("./utils/redis_client");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});

const expressLogger = expressPino({ logger });
const app = express();
app.use(express.json());
app.use(expressLogger);
app.use("/api/v1", routes);

const hostname = "localhost";
const port = process.env.PORT || 3000;
connectDb()
  .then(async () => {
    logger.info("Connected to MongoDB");
    app.listen(port, () =>
      logger.info(`Express listening on port http://${hostname}:${port}/`)
    );
  })
  .catch((err) => logger.error(err));

module.exports = { app, logger };

// todo dockerize
