const mongoose = require("mongoose");
const redis = require("redis");
const { promisify } = require("util");
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
client.hgetall = promisify(client.hgetall);
client.hget = promisify(client.hget);

const { exec } = mongoose.Query.prototype;

const checkCache = async (key) => {
  const cacheValue = await client.hgetall(key);
  if (!cacheValue) {
    logger.info("Data not found cached in Redis");
    return null;
  }
  logger.info("Found data in cached in Redis");
  return cacheValue;
};

const setCache = (key, value) => {
  logger.info(`Setting new cache for key: ${key}`);
  client.hmset(key, value);
  client.expire(key, 3600);
};

mongoose.Query.prototype.cache = function (options = { expire: 3600 }) {
  this.useCache = true;
  this.expire = options.expire;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

  return this;
};

mongoose.Query.prototype.exec = async function (...args) {
  if (!this.useCache) {
    return exec.apply(this, args);
  }
  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name,
  });

  const cacheValue = await client.hget(this.hashKey, key);

  if (!cacheValue) {
    const result = await exec.apply(this, args);
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
  checkCache,
  setCache,
};
