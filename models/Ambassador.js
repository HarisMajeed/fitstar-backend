const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ambassadorSchema = new Schema(
  {
    name: { type: String, default: "" },
    title: { type: String, default: "" },
    tagLine: { type: String, default: "" },
    picture: { type: String, default: "" },
    description: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    youtube: { type: String, default: "" },
    tiwtter: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const Ambassador = mongoose.model("Ambassadors", ambassadorSchema);

module.exports = Ambassador;
