const LandingPage = require("../models/LandingPage");
const constant = require("../constants/ConstantMessages");
const file = require("../utils/fileUpload");

/**Update LandingPage */
exports.update = async (req, res) => {
  try {
    if (req.body.bannerImage) {
      req.body.bannerImage = await file.upload(
        req.body.bannerImage,
        "",
        constant.FITSTAR_BUCKET.landing
      );
    }

    if (req.body.aboutUsBannerImage) {
      req.body.aboutUsBannerImage = await file.upload(
        req.body.aboutUsBannerImage,
        "",
        constant.FITSTAR_BUCKET.landing
      );
    }
    const landingPage = await LandingPage.updateOne({ _id: req.params.id }, req.body);
    if (!landingPage) {
      return res
        .status(500)
        .json({ status: false, message: constant.SERVER_ERROR });
    }
    return res.status(200).json({ message: constant.LANDING_UPDATED });
  } catch (error) {
    console.log("Error!", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**GET Landing Get */
exports.get = async (req, res) => {
  try {
    let landingPage = await LandingPage.find().exec();
    return res
      .status(200)
      .send({ status: true, message: constant.SUCCESS, landingPage });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
