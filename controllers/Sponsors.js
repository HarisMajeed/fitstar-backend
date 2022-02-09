const Sponsors = require("../models/Sponsors");
const constant = require("../constants/ConstantMessages");
const userHelper = require("../helpers/user");
const file = require("../utils/fileUpload");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**Create Sponsors */
exports.create = async (req, res) => {
  try {
    if (req.body.image) {
      req.body.image = await file.upload(
        req.body.image,
        "",
        constant.FITSTAR_BUCKET.sponsor
      );
    }
    const sponsor = await Sponsors.create(req.body);
    if (!sponsor) {
      return res
        .status(500)
        .json({ status: false, message: constant.SERVER_ERROR });
    }
    return res.status(200).json({ message: constant.CREATE_SPONSOR });
  } catch (error) {
    console.log("Error!", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**Update Sponsors */
exports.update = async (req, res) => {
  try {
    if (req.body.image) {
      req.body.image = await file.upload(
        req.body.image,
        "",
        constant.FITSTAR_BUCKET.sponsor
      );
    }
    const sponsor = await Sponsors.updateOne({ _id: req.params.id }, req.body);
    if (!sponsor) {
      return res
        .status(500)
        .json({ status: false, message: constant.SERVER_ERROR });
    }
    return res.status(200).json({ message: constant.UPDATE_SPONSOR });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ message: error.message });
  }
};

/**GET Sponsors */
exports.get = async (req, res) => {
  try {
    let sponsors = await Sponsors.find();
    return res
      .status(200)
      .send({ status: true, message: constant.SUCCESS, sponsors });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**DELETE Sponsors */
exports.delete = async (req, res) => {
  try {
    await Sponsors.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ status: true, message: constant.DELETE_COLLABORATOR });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**Search Sponsors */
exports.search = async (req, res) => {
  try {
    let sponsors = await Sponsors.find({
      $or: [
        {title: { $regex: req.params.search, $options: 'i' } },
        { description: { $regex: req.params.search, $options: 'i' } },
      ],
    });
    return res
      .status(200)
      .send({ status: true, message: constant.RETRIEVE_SPONSOR, sponsors });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
