const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collaboratorSchema = new Schema(
  {
    title: { type: String, default: "" },
    subTitle: { type: String, default: "" },
    picture: { type: String, default: "" },
    instagram: { type: String },
    facebook: { type: String, default: "" },
    youtube: { type: String, default: "" },
    twitter: { type: String, default: "" },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

const Collaborator = mongoose.model("Collaborators", collaboratorSchema);

module.exports = Collaborator;
