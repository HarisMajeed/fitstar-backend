const Sponsors = require("../models/Sponsors");
const constant = require("../constants/ConstantMessages");
const file = require("../utils/fileUpload");

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
    let totalRecord = await Sponsors.countDocuments({isDeleted: false});
    let sponsors = await Sponsors.find({isDeleted: false})
    .sort({ _id: -1 })
    .limit(parseInt(req.params.limit) || 10)
    .skip((parseInt(req.params.offset) - 1))
    .exec();
    return res
      .status(200)
      .send({ status: true, message: constant.SUCCESS, totalRecord, sponsors });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**DELETE Sponsors */
exports.delete = async (req, res) => {
  try {
    await Sponsors.updateOne({ _id: req.params.id }, { $set: { isDeleted: true } });
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
