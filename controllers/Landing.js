const LandingPage = require("../models/LandingPage");
const constant = require("../constants/ConstantMessages");
const file = require("../utils/fileUpload");

/**Update LandingPage */
exports.update = async (req, res) => {
  try {
    let allImages = [];
    let banners = [];
    if (req.body.landingPage) {
      banners = req.body.landingPage.map(async (item) => {
        return file.upload(
          item.bannerImage ? item.bannerImage : "",
          "",
          constant.FITSTAR_BUCKET.landing
        );
      });
      allImages = await Promise.all(banners);
      allImages.forEach((item, i) => {
        req.body.landingPage[i].bannerImage = item;
      });
      /** End */
    }

    console.log("Landding Response", req.body.landingPage);
    if (
      req.body.aboutPageDetails &&
      req.body.aboutPageDetails.aboutUsBannerImage
    ) {
      req.body.aboutUsBannerImage = await file.upload(
        req.body.aboutPageDetails.aboutUsBannerImage,
        "",
        constant.FITSTAR_BUCKET.landing
      );
    }
    const landingPage = await LandingPage.updateOne(
      { _id: req.params.id },
      req.body
    );
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
      .send({ status: true, message: constant.SUCCESS, data:landingPage[0]?landingPage[0]:{} });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
