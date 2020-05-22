const router = require("express").Router();
const speedtest = require("./speedtests");

router.use("/speedtests", speedtest);

module.exports = router;
