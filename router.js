const express = require("express");
const router = express.Router();
const controller = require("./controller/controller");

router.post("/api", controller.Transaction);

module.exports = router;
