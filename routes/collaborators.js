const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/Collaborator");
const adminAuth = require("../middleware/adminAuth");
const { createCollaborator } = require("../middleware/validations/collaboratorValidation");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create", adminAuth, createCollaborator, function (req, res) {
  collaboratorController.create(req, res);
});

router.get("/get/:limit/:offset", function (req, res) {
  collaboratorController.get(req, res);
});

router.put("/update/:id", adminAuth, function (req, res) {
  collaboratorController.update(req, res);
});

router.delete("/delete/:id", adminAuth, function (req, res) {
  collaboratorController.delete(req, res);
});

router.get("/search/:search/:limit/:offset", adminAuth, function (req, res) {
  collaboratorController.search(req, res);
});

module.exports = router;
