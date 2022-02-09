const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const landingPageSchema = new Schema(
  {
    bannerTitle: { type: String, default: "Connect To FitstarPro 1" },
    aboutUsMainHeading: { type: String, default: "Excellent FitstarPro" },
    aboutUsSubHeading: { type: String, default: "Our Goals " },
    aboutUsDetails: {
      type: String,
      default: `1. Physical activity
                2. Entertainment`,
    },
    footerDetails: { type: String, default: "Description of Our site on Footer area " },
    footerPhone: { type: String, default: "+93002739370120" },
    instagram: { type: String, default: "https://www.instagram.com/" },
    facebook: { type: String, default: "https://www.facebook.com/" },
    youtube: { type: String, default: "https://www.youtube.com/" },
    twitter: { type: String, default: "https://www.twitter.com/" },
    linkedin: { type: String, default: "https://www.linkedin.com/" },
    privacyPolicy: { type: String, default: "copyright | Lynxera } TestTestTest" },
    termsAndConditions: { type: String, default:"Strict Role for Development " },
    bannerImage: { type: String, default:"" },
    aboutUsBannerImage: { type: String, default:"" },
},
  { timestamps: true, versionKey: false }
);

const LandingPage = mongoose.model("LandingPage", landingPageSchema);

module.exports = LandingPage;
