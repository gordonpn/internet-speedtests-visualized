const router = require("express").Router();
const speedtest = require("./speedtests");

router.use("/", speedtest);

module.exports = router;
