const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/Dashboard");
const adminAuth = require("../middleware/adminAuth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/cards", adminAuth, function (req, res) {
  dashboardController.cards(req, res);
});
router.get("/latest/users", adminAuth, function (req, res) {
  dashboardController.getLatestUsers(req, res);
});
router.get("/graph/data", adminAuth, function (req, res) {
  dashboardController.getGraphData(req, res);
});

module.exports = router;
