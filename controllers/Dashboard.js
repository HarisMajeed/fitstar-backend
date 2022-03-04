const User = require("../models/User");
const Blogs = require("../models/Blogs");
const Ambassador = require("../models/Ambassador");
const Sponsors = require("../models/Sponsors");
const Collaborators = require("../models/Collaborators");

const userHelper = require("../helpers/user");
const bcrypt = require("bcrypt");
const constant = require("../constants/ConstantMessages");
const { upload } = require("../utils/fileUpload");
const Profiles = require("../models/Profiles");

exports.cards = async (req, res) => {
  try {
    let promises = await Promise.all([
      Ambassador.countDocuments({ isDeleted: false }),
      User.countDocuments({ role: { $ne: "admin" }, isDeleted: false }),
      Blogs.countDocuments({ isDeleted: false }),
      Sponsors.countDocuments({ isDeleted: false }),
      Collaborators.countDocuments({ isDeleted: false }),
    ]);
    return res
    .status(200)
    .send({ status: true, message: constant.SUCCESS, promises });
  } catch (error) {
    console.error("Admin Dashboard", error);
    return res.status(500).send({ message: error.message });
  }
};

/**GET Latest User */
exports.getLatestUSers = async (req, res) => {
    try {
      let users = await User.find({ role: { $ne: "admin" }, isDeleted: false })
        .sort({ _id: -1 })
        .limit(5)
        .skip(0)
        .exec();
      return res
        .status(200)
        .send({ status: true, message: constant.SUCCESS, users });
    } catch (error) {
      console.log("ERROR:::", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  };
