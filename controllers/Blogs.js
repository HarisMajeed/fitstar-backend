const Blogs = require("../models/Blogs");
const constant = require("../constants/ConstantMessages");
const file = require("../utils/fileUpload");

/**Create Blog */
exports.create = async (req, res) => {
  try {
    if (req.body.featuredImageOne) {
      req.body.featuredImageOne = await file.upload(
        req.body.featuredImageOne,
        "",
        constant.FITSTAR_BUCKET.blog
      );
    }
    if (req.body.featuredImageTwo) {
      req.body.featuredImageTwo = await file.upload(
        req.body.featuredImageTwo,
        "",
        constant.FITSTAR_BUCKET.blog
      );
    }
    if (req.body.authorImage) {
      req.body.authorImage = await file.upload(
        req.body.authorImage,
        "",
        constant.FITSTAR_BUCKET.blog
      );
    }
    const blog = await Blogs.create(req.body);
    if (!blog) {
      return res
        .status(500)
        .json({ status: false, message: constant.SERVER_ERROR });
    }
    return res.status(200).json({ message: constant.CREATE_BLOG });
  } catch (error) {
    console.log("Error!", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**Update Blog */
exports.update = async (req, res) => {
  try {
    if (req.body.featuredImageOne) {
      req.body.featuredImageOne = await file.upload(
        req.body.featuredImageOne,
        "",
        constant.FITSTAR_BUCKET.blog
      );
    }
    if (req.body.featuredImageTwo) {
      req.body.featuredImageTwo = await file.upload(
        req.body.featuredImageTwo,
        "",
        constant.FITSTAR_BUCKET.blog
      );
    }
    if (req.body.authorImage) {
      req.body.authorImage = await file.upload(
        req.body.authorImage,
        "",
        constant.FITSTAR_BUCKET.blog
      );
    }
    const blog = await Blogs.updateOne({ _id: req.params.id }, req.body);
    if (!blog) {
      return res
        .status(500)
        .json({ status: false, message: constant.SERVER_ERROR });
    }
    return res.status(200).json({ message: constant.UPDATE_BLOG });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ message: error.message });
  }
};

/**GET Blogs */
exports.get = async (req, res) => {
  try {
    let blogs = await Blogs.find().exec();
    return res
      .status(200)
      .send({ status: true, message: constant.SUCCESS, blogs });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**DELETE Blog */
exports.delete = async (req, res) => {
  try {
    await Blogs.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ status: true, message: constant.DELETE_BLOG });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**Search Blog */
exports.search = async (req, res) => {
  try {
    let blogs = await Blogs.find({
      $or: [
        {title: { $regex: req.params.search, $options: 'i' } },
        { description: { $regex: req.params.search, $options: 'i' } },
      ],
    });
    return res
      .status(200)
      .send({ status: true, message: constant.RETRIEVE_BLOG, blogs });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
