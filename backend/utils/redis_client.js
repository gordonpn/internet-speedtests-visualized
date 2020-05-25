const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const pino = require("pino");
require("dotenv").config();

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});

const host = process.env.REDIS_HOST || "speedtest-redis";

logger.info(`Connecting to Redis on host ${host}`);

const client = redis.createClient({ host, port: 6379 });
client.on("ready", () => logger.info("Connected to Redis"));
client.on("error", (err) => logger.error(err));
client.hget = util.promisify(client.hget);

const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.cache = function (options = { expire: 3600 }) {
  this.useCache = true;
  this.expire = options.expire;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify({
    collection: this.mongooseCollection.name,
  });

  const cacheValue = await client.hget(this.hashKey, key);

  if (!cacheValue) {
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result));
    client.expire(this.hashKey, this.expire);

    logger.info("Return data from MongoDB");
    return result;
  }

  const doc = JSON.parse(cacheValue);
  logger.info("Return data from Redis");
  return Array.isArray(doc)
    ? doc.map((d) => new this.model(d))
    : new this.model(doc);
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
