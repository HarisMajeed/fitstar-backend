const Ambassador = require("../models/Ambassador");
const constant = require("../constants/ConstantMessages");
const file = require("../utils/fileUpload");

/**Create Ambassador */
exports.create = async (req, res) => {
  try {
    if (req.body.picture) {
      req.body.picture = await file.upload(
        req.body.picture,
        "",
        constant.FITSTAR_BUCKET.ambassador
      );
    }
    const ambassador = await Ambassador.create(req.body);
    if (!ambassador) {
      return res
        .status(500)
        .json({ status: false, message: constant.SERVER_ERROR });
    }
    return res.status(200).json({ message: constant.CREATE_AMBASSADOR });
  } catch (error) {
    console.log("Error!", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**Update Ambassador */
exports.update = async (req, res) => {
  try {
    if (req.body.picture) {
      req.body.picture = await file.upload(
        req.body.picture,
        "",
        constant.FITSTAR_BUCKET.ambassador.ambassador
      );
    }
    const ambassador = await Ambassador.updateOne(
      { _id: req.params.id },
      req.body
    );
    if (!ambassador) {
      return res
        .status(500)
        .json({ status: false, message: constant.SERVER_ERROR });
    }
    return res.status(200).json({ message: constant.UPDATE_AMBASSADOR });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ message: error.message });
  }
};

/**GET Ambassador */
exports.get = async (req, res) => {
  try {
    let totalRecord = await Ambassador.countDocuments({isDeleted: false});
    let ambassador = await Ambassador.find({isDeleted: false})
      .sort({ _id: -1 })
      .limit(parseInt(req.params.limit) || 10)
      .skip((parseInt(req.params.offset) - 1))
      .exec();
    return res
      .status(200)
      .send({ status: true, message: constant.SUCCESS, totalRecord, ambassador });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**DELETE Ambassador */
exports.delete = async (req, res) => {
  try {
    await Ambassador.updateOne({ _id: req.params.id }, { $set: { isDeleted: true } });
    return res
      .status(200)
      .send({ status: true, message: constant.DELETE_AMBASSADOR });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**Search Ambassador */
exports.search = async (req, res) => {
  try {
    let ambassador = await Ambassador.find({
      $or: [
        { title: { $regex: req.params.search, $options: "i" } },
        { description: { $regex: req.params.search, $options: "i" } },
      ],
    });
    return res
      .status(200)
      .send({ status: true, message: constant.RETRIEVE_SPONSOR, ambassador });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
