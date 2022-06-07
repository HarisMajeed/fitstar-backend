const mongoose = require("mongoose");
const Users = require('./User');
const Schema = mongoose.Schema;
const proAboutSchema = new Schema({
  business: {
    name: { type: String, default: "" },
    clientPreference: { type: String, default: "" },
    availabilityForInHomeTraining: { type: String, default: "" },
    availabilityForOnLineliveTraining: { type: String, default: "" },
    trainingRates: { type: Number, default: 0 },
    noteAboutTrainingRates: { type: String, default: "" },
  },
  qualifications: {
    degree: { type: String, default: "" },
    professions: { type: String, default: "" },
    experience: { type: String, default: "" },
    certification: [],
    specialities: [],
    languages: [],
    trainingMethodsAndStyles: { type: String, default: "" },
    fitnessAward: [],
    productsRating: [
      {
        product: { type: String, default: "" },
        review: { type: String, default: "" },
        starts: { type: Number, default: 0 },
      },
    ],
  },
  personal: {
    name: { type: String, default: "" },
    profileUrl: { type: String, default: "" },
    gender: { type: String, default: "" },
    age: { type: Number, default: null }, 
    height: {
      number: { type: Number, default: null },
      measurement: { type: String, enum: ["Meters", "Feet"], default: "Feet" },
    },
    weight: {
      number: { type: Number, default: null },
      measurement: {
        type: String,
        enum: ["Kilos", "Pounds"],
        default: "Pounds",
      },
    },
    dietType: { type: String, default: "" },
    bodyType: { type: String, default: "" },
    activites: [],
    aboutMe: { type: String, default: "" },
    productsRating: [
      {
        product: { type: String, default: "" },
        review: { type: String, default: "" },
        starts: { type: Number, default: 0 },
      },
    ],
    sponsorImages: [
      {
        name: { type: String, default: "" },
        fileUrl: { type: String, default: "" },
      },
    ],
  },
});
const centerAboutSchema = new Schema({
  name: {type: String, default: ""},
  profileUrl: {type: String, default: ""},
  openSince: { type: Number, default: 0 },
  fitnessCenterType: { type: String, default: "" },
  language: [],
  specialities: [],
  hoursOfOperation: { type: Number, default: 0 },
  accomplishments: { type: String, default: "" },
  ourFitnessPro: [],
  ourStory: { type: String, default: "" },
  membership:{type:String, default:""},
  productsRating: [
    {
      product: { type: String, default: "" },
      review: { type: String, default: "" },
      starts: { type: Number, default: 0 },
    },
  ],
});
const modelAboutSchema = new Schema({
  name: { type: String, default: "" },
  profileUrl: { type: String, default: "" },
  gender: { type: String, default: "" },
  age: { type: Number, default: null },
  height: {
    number: { type: Number, default: 0 },
    measurement: { type: String, enum: ["Meters", "Feet"], default: "Feet" },
  },
  weight: {
    number: { type: Number, default: 0 },
    measurement: { type: String, enum: ["Kilos", "Pounds"], default: "Pounds" },
  },
  bodyType: { type: String, default: "" },
  ethnicity: { type: String, default: "" },
  skinTone: { type: String, default: "" },
  eyeColor: { type: String, default: "" },
  hairLength: { type: Number, default: null },
  tattoos: { type: String, default: "" },
  piercings: { type: String, default: "" },
  experience: { type: String, default: "" },
  languages: [],
  workingWithMedia: { type: Boolean, default: false },
  modelingInterest: [],
  compensation: { type: String, default: "" },
  noteAboutCompensation: { type: String, default: "" },
  activites: [],
  aboutMe: { type: String, default: "" },
  productsRating: [
    {
      product: { type: String, default: "" },
      review: { type: String, default: "" },
      starts: { type: Number, default: 0 },
    },
  ],
});
const profiles = new Schema(
  {
    fullName: { type: String, default: "" },
    image: { type: String, default: "" },
    location: [
      {
        country: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
      },
    ],
    rating: { type: Number, default: 0 },
    ratingComment: { type: String, default: "" },
    proAbout: { type: proAboutSchema, default: {} },
    modelAbout: {type: modelAboutSchema, default: {} },
    centerAbout: {type: centerAboutSchema, default: {} },
    videos: [],
    portfolio: [
      {
        imageBefore: { type: String, default: "" },
        imageAfter: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    gallery: [],
    ads: [
      {
        serviceTitle: { type: String, default: "" },
        interests: [],
        compensation: [],
        sessionName: { type: String, default: "" },
        activities: [],
        days: [],
        intensityLevel: { type: String, default: "" },
        location: { type: String, default: "" },
        time: { type: String, default: "" },
        description: { type: String, default: "" },
        price: { type: Number, default: null },
        file: { type: String, default: "" },
        spotsAvailbe: { type: String, default: '' },
      },
    ],
    contactUs: {
      address: { type: String, default: "" },
      phoneNo: { type: String, default: "" },
      blogLink: { type: String, default: "" },
      gymName1: { type: String },
      gymName2: { type: String },
      gymName3: { type: String },
      address1: { type: String },
      address2: { type: String },
      address3: { type: String },
      phoneNumber: { type: String },
      facebookLink: { type: String, default: "" },
      instagramLink: { type: String, default: "" },
      twitterLink: { type: String, default: "" },
      youtubeLink: { type: String, default: "" },
      websiteLink: { type: String, default: "" },
      bookingLink: { type: String, default: "" },
      linkForLivePortal: { type: String, default: "" },
      vimeoLink: { type: String, default: "" },
      otherLink: { type: String, default: "" },
    },
    activeRole: { type: String, enum: ["","pro", "center", "model"] },
    role: { type: String, enum: ["pro", "center", "model"] },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true, versionKey: false }
);

const Profiles = mongoose.model("Profiles", profiles);

module.exports = Profiles;
