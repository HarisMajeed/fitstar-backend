const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const landingPageSchema = new Schema(
  {
    landingPage:[],
    socialAccountDetails:{
      instagram: { type: String, default: "https://www.instagram.com/" },
      facebook: { type: String, default: "https://www.facebook.com/" },
      youtube: { type: String, default: "https://www.youtube.com/" },
      twitter: { type: String, default: "https://www.twitter.com/" },
      linkedin: { type: String, default: "https://www.linkedin.com/" },
    },
    aboutPageDetails:{
      aboutUsBannerImage: { type: String, default: "http://localhost:4200" },
      bannerTitle: { type: String, default: "Connect To FitstarPro 1" },
      aboutUsMainHeading: { type: String, default: "Excellent FitstarPro" },
      aboutUsSubHeading: { type: String, default: "Our Goals " },
      aboutUsDetails: {
        type: String,
        default: `1. Physical activity
                  2. Entertainment`,
      }
    },
    privacyDetails:{
      privacyPolicy: { type: String, default: "copyright | Lynxera } TestTestTest" },
    },
    footerDetails:{
      footerDetails: { type: String, default: "Description of Our site on Footer area " },
      footerPhone: { type: String, default: "+93002739370120" },
      footerEmail: { type: String, default: "inf@fitstar.com" }
    },
    termConditions:{
      termsAndConditions: { type: String, default:"Strict Role for Development " }
    }
},
  { timestamps: true, versionKey: false }
);

const LandingPage = mongoose.model("LandingPage", landingPageSchema);

module.exports = LandingPage;
