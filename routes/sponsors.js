const express = require("express");
const router = express.Router();
const sponsorsController = require("../controllers/Sponsors");
const adminAuth = require("../middleware/adminAuth");


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create", adminAuth,  function (req, res) {
  sponsorsController.create(req, res);
});

router.get("/get/:limit/:offset", adminAuth, function (req, res) {
  sponsorsController.get(req, res);
});

router.put("/update/:id", adminAuth, function (req, res) {
  sponsorsController.update(req, res);
});

router.delete("/delete/:id", adminAuth, function (req, res) {
  sponsorsController.delete(req, res);
});

router.get("/search/:search", adminAuth, function (req, res) {
  sponsorsController.search(req, res);
});

module.exports = router;
