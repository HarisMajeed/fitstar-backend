const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const { userCreate } = require("../middleware/validations/userValidations");
const {
  changePassword,
  emailUpdate,
} = require("../middleware/validations/authValidations");
const { addressUpdate } = require("../middleware/validations/userValidations");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.put("/profile/basic/:id", auth, function (req, res) {
  userController.profileBasic(req, res);
});

router.put("/profile/about/:id", auth, function (req, res) {
  userController.profileAbout(req, res);
});
router.put("/profile/video/:id", auth, function (req, res) {
  userController.profileVideo(req, res);
});
router.put("/profile/portfolio/:id", auth, function (req, res) {
  userController.profilePortfolio(req, res);
});
router.put("/profile/gallery/:id", auth, function (req, res) {
  userController.profileGallery(req, res);
});
router.put("/profile/ads/:id", auth, function (req, res) {
  userController.profileAds(req, res);
});
router.put("/profile/contactUs/:id", auth, function (req, res) {
  userController.profileEdit(req, res);
});

router.put("/change/password/:id", auth, changePassword, function (req, res) {
  userController.changePassword(req, res);
});

router.put("/update/email/:id", auth, emailUpdate, function (req, res) {
  userController.emailUpdate(req, res);
});

router.put("/update/address/:id", auth, addressUpdate, function (req, res) {
  userController.updateAddress(req, res);
});

router.put("/email/check/:email", auth, function (req, res) {
  userController.emailCheck(req, res);
});

router.get("/get", auth, function (req, res) {
  userController.getProfile(req, res);
});

router.post("/create", adminAuth, userCreate, function (req, res) {
  userController.create(req, res);
});

router.get("/all", adminAuth, function (req, res) {
  userController.get(req, res);
});

router.get("/get/:role", adminAuth, function (req, res) {
  userController.getByRole(req, res);
});

router.delete("/delete/:id", adminAuth, function (req, res) {
  userController.delete(req, res);
});

router.get("/search/:search", adminAuth, function (req, res) {
  userController.search(req, res);
});

module.exports = router;