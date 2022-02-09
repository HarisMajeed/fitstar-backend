const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, default: "" },
    descrption: { type: String, default: "" },
    authorName: { type: String },
    category: {
      type: String,
      enum: [
        "Nutrition",
        "Recipies",
        "Workouts",
        "Reviews",
        "Podcasts",
        "Music",
        "News",
      ],
    },
    featuredImageOne: { type: String, default: "" },
    featuredImageTwo: { type: String, default: "" },
    authorImage: { type: String, default: "" },
    videoLink: { type: String, default: "" },
    details: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const Blog = mongoose.model("Blogs", blogSchema);

module.exports = Blog;
