const mongoose = require("mongoose");
require("dotenv").config();

const speedtestSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
    },
    speed: {
      type: Number,
    },
  },
  { collection: process.env.MONGODB_COLLECTION }
);

module.exports = mongoose.model("SpeedTest", speedtestSchema);
