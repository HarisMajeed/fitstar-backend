const express = require("express");
const router = express.Router();
const ambassadorController = require("../controllers/Ambassador");
const adminAuth = require("../middleware/adminAuth");


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create", adminAuth,  function (req, res) {
  ambassadorController.create(req, res);
});

router.get("/get/:limit/:offset", function (req, res) {
  ambassadorController.get(req, res);
});

router.put("/update/:id", adminAuth, function (req, res) {
  ambassadorController.update(req, res);
});

router.delete("/delete/:id", adminAuth, function (req, res) {
  ambassadorController.delete(req, res);
});

router.get("/search/:search/:limit/:offset", adminAuth, function (req, res) {
  ambassadorController.search(req, res);
});

module.exports = router;
