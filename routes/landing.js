const express = require("express");
const router = express.Router();
const landingController = require("../controllers/Landing");
const adminAuth = require("../middleware/adminAuth");


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create", adminAuth,  function (req, res) {
    landingController.create(req, res);
});

router.get("/get", adminAuth, function (req, res) {
    landingController.get(req, res);
});

module.exports = router;
