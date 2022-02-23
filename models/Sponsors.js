const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sponsorSchema = new Schema(
  {
    image: { type: String, default: "" },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: true }
  },
  { timestamps: true, versionKey: false }
);

const Sponsors = mongoose.model("Sponsors", sponsorSchema);

module.exports = Sponsors;
