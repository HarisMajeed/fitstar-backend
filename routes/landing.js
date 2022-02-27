const express = require("express");
const router = express.Router();
const landingController = require("../controllers/Landing");
const adminAuth = require("../middleware/adminAuth");


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.put("/update/:id", adminAuth,  function (req, res) {
    landingController.update(req, res);
});

router.get("/get", function (req, res) {
    landingController.get(req, res);
});

module.exports = router;
