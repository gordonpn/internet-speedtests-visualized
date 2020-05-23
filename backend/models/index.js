const mongoose = require("mongoose");
const pino = require("pino");

require("dotenv").config();

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  prettyPrint: { colorize: true },
});

const dbName = process.env.MONGO_INITDB_DATABASE;
const dbUsername = process.env.MONGO_NON_ROOT_USERNAME;
const dbPassword = process.env.MONGO_NON_ROOT_PASSWORD;
const host = process.env.MONGO_HOST || "speedtest-mongodb";
const uri = `mongodb://${dbUsername}:${dbPassword}@${host}:27017/${dbName}`;

logger.info(`Connecting to MongoDB on host ${host}`);

const connectDb = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectDb };
