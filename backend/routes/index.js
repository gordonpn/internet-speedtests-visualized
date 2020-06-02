const router = require("express").Router();
const speedtest = require("./speedtests");
const healthcheck = require("./healthcheck");

router.use("/speedtests", speedtest);
router.use("/healthcheck", healthcheck);

module.exports = router;
