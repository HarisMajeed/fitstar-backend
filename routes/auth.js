const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");
const {
  user,
  userLogin,
} = require("../middleware/validations/authValidations");

/* GET users listing. */
router.get("/", user, function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", user, function (req, res) {
  authController.signUpUser(req, res);
});
router.post("/signin", userLogin, function (req, res) {
  authController.login(req, res);
});
router.get("/signout", function (req, res) {
  authController.logout(req, res);
});

module.exports = router;
