const express = require("express");
const cors = require("cors");
const pino = require("pino");
const expressPino = require("express-pino-logger");
const { connectDb } = require("./models/index");
const routes = require("./routes/index");

require("dotenv").config();
require("./utils/redis_client");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});

const whitelist = ["http://localhost:4000", "https://speed.gordon-pn.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const expressLogger = expressPino({ logger });
const app = express();
app.use(express.json());
app.use(expressLogger);
app.use("/api/v1", routes);
app.use(cors(corsOptions));

const host = "0.0.0.0";
const port = process.env.PORT || 3000;
connectDb()
  .then(async () => {
    logger.info("Connected to MongoDB");
    app.listen(port, host, () =>
      logger.info(`Express listening on port http://${host}:${port}/`)
    );
  })
  .catch((err) => logger.error(err));

module.exports = { app, logger };
