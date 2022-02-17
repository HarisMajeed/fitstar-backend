const express = require("express");
const router = express.Router();
const blogController = require("../controllers/Blogs");
const adminAuth = require("../middleware/adminAuth");
const { createBlog } = require("../middleware/validations/blogValidations");


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create", adminAuth, createBlog, function (req, res) {
  blogController.create(req, res);
});

router.get("/get", adminAuth, function (req, res) {
  blogController.get(req, res);
});

router.put("/update/:id", adminAuth, function (req, res) {
  blogController.update(req, res);
});

router.delete("/delete/:id", adminAuth, function (req, res) {
  blogController.delete(req, res);
});

router.get("/search/:search", adminAuth, function (req, res) {
  blogController.search(req, res);
});

module.exports = router;