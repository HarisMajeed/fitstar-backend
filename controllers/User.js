const User = require("../models/User");
const userHelper = require("../helpers/user");
const bcrypt = require("bcrypt");
const constant = require("../constants/ConstantMessages");
const file = require("../utils/fileUpload");
const Profiles = require("../models/Profiles");

/**update basic info and active role of user */
exports.profileBasic = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({ message: "Nothing to update" });
    }
    let profile = await Profiles.findOne({
      role: req.body.role,
      user: req.user._id,
    });
    if (req.body.image) {
      req.body.image = await file.upload(
        req.body.image,
        "",
        constant.FITSTAR_BUCKET.user
      );
    }
    req.body.activeRole = req.body.role;
    if (profile) {
      await Profiles.updateOne({ _id: profile._id }, req.body);
      await Profiles.updateMany(
        { user: req.user._id, activeRole: { $ne: req.body.activeRole } },
        { $set: { activeRole: "" } }
      );
      profile = await Profiles.findById(profile._id);
      return res
        .status(200)
        .send({ message: constant.PROFILE_UPDATE, profile });
    }
    req.body.user = req.user._id;
    profile = await Profiles.create(req.body);
    await Profiles.updateMany(
      { user: req.user._id, activeRole: { $ne: req.body.activeRole } },
      { $set: { activeRole: "" } }
    );
    return res.status(200).send({ message: constant.PROFILE_UPDATE, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.profileAbout = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({ message: "Nothing to update" });
    }
    await Profiles.updateOne({ _id: req.params.id }, req.body);
    let profile = await Profiles.findById(req.params.id);
    return res.status(200).send({ message: constant.PROFILE_UPDATE, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.profileVideo = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({ message: "Nothing to update" });
    }
    await Profiles.updateOne({ _id: req.params.id }, req.body);
    let profile = await Profiles.findById(req.params.id);
    return res.status(200).send({ message: constant.PROFILE_UPDATE, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.profilePortfolio = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({ message: "Nothing to update" });
    }
    await Profiles.updateOne({ _id: req.params.id }, req.body);
    let profile = await Profiles.findById(req.params.id);
    return res.status(200).send({ message: constant.PROFILE_UPDATE, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.profileGallery = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({ message: "Nothing to update" });
    }
    await Profiles.updateOne({ _id: req.params.id }, req.body);
    let profile = await Profiles.findById(req.params.id);
    return res.status(200).send({ message: constant.PROFILE_UPDATE, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.profileAds = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({ message: "Nothing to update" });
    }
    await Profiles.updateOne({ _id: req.params.id }, req.body);
    let profile = await Profiles.findById(req.params.id);
    return res.status(200).send({ message: constant.PROFILE_UPDATE, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.profileContactUs = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({ message: "Nothing to update" });
    }
    await Profiles.updateOne({ _id: req.params.id }, req.body);
    let profile = await Profiles.findById(req.params.id);
    return res.status(200).send({ message: constant.PROFILE_UPDATE, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    let user = await Profiles.findOne({
      user: req.user._id,
      activeRole: req.params.role,
    });
    return res.status(200).send({ message: constant.SUCCESS, user: user[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    let body = req.body;
    let user = await User.findById({ _id: req.params.id });
    if (user) {
      let match = bcrypt.compareSync(body.oldPassword, user.password);
      if (match) {
        user.password = body.newPassword;
        await user.save();
        let getToken = await userHelper.loginToken(user);
        return res.status(200).send(getToken);
      } else {
        return res.status(409).send({ message: "Wrong password" });
      }
    } else {
      return res.status(401).send({ message: "Invalid user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.emailCheck = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email });
    if (user) {
      return res.status(200).json({ status: true });
    }
    return res.status(200).json({ status: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.emailUpdate = async (req, res) => {
  try {
    let body = req.body;
    let user = await User.findById({ _id: req.params.id });
    if (user) {
      user.email = body.email;
      await user.save();
      let getToken = await userHelper.loginToken(user);
      return res.status(200).send(getToken);
    } else {
      return res.status(401).send({ message: "Invalid user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    let body = req.body;
    let user = await User.findById({ _id: req.params.id });
    if (user) {
      user.status = body.status;
      await user.save();
      return res.status(200).send({ message: constant.UPDATE_USER });
    } else {
      return res.status(401).send({ message: "Invalid user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

/**Create User */
exports.create = async (req, res) => {
  try {
    req.body.email = req.body.email.toLowerCase();
    let getUser = await User.findOne({ email: req.body.email });
    if (getUser) {
      return res
        .status(400)
        .send({ status: false, message: constant.ALREADY_REGISTERED });
    }
    req.body.status = constant.ACTIVE;
    req.body.isDeleted = false;
    const user = await User.create(req.body);
    req.body.activeRole = req.body.role;
    req.body.user = user._id;
    if (req.body.image) {
      req.body.image = await file.upload(
        req.body.image,
        "",
        constant.FITSTAR_BUCKET.sponsor
      );
    }
    const profile = await Profiles.create(req.body);
    if (!user) {
      return res
        .status(500)
        .json({ status: false, message: constant.SERVER_ERROR });
    }
    // await mailer.signUpEmail(req.body.email);

    return res
      .status(201)
      .json({ status: true, message: constant.CREATE_USER });
  } catch (error) {
    console.log("Error!", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**GET User */
exports.get = async (req, res) => {
  try {
    let totalRecord = await User.countDocuments({
      role: { $ne: "admin" },
      isDeleted: false,
    });
    let users = await User.find({ role: { $ne: "admin" }, isDeleted: false })
      .sort({ _id: -1 })
      .limit(parseInt(req.params.limit) || 10)
      .skip(parseInt(req.params.limit) * (parseInt(req.params.offset) - 1))
      .exec();
    return res
      .status(200)
      .send({ status: true, message: constant.SUCCESS, totalRecord, users });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**DELETE User */
exports.delete = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { $set: { isDeleted: true } });
    return res
      .status(200)
      .send({ status: true, message: constant.DELETE_USER });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**Search User */
exports.search = async (req, res) => {
  try {
    let users = await User.find({
      $or: [
        { title: { $regex: req.params.search, $options: "i" } },
        { description: { $regex: req.params.search, $options: "i" } },
      ],
    });
    return res
      .status(200)
      .send({ status: true, message: constant.RETRIEVE_USER, users });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**GET User By role */
exports.getByRole = async (req, res) => {
  try {
    let users = await Profiles.find({ role: req.params.role},'image -_id').populate('user', '-password');
    users = users.map(item=>{
      let user = item.user.toObject();
      user.image = item.image;
      delete item.image;
      return user;
    })
    return res
      .status(200)
      .send({ status: true, message: constant.SUCCESS, users });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/**Landing page Search user by role */

exports.searchUserByRole = async (req, res) => {
  try {
    console.log("REQ::::::::::", req.query.role);
    let profileList = await Profiles.aggregate([
      {
        $match: {
          $or: [
            // { fullName: { $regex: req.query.search?req.query.search:'', $options: "i" } },
            { role: req.query.role  },
            // { location: req.query.location }
          ]
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return res
      .status(200)
      .send({ status: true, message: constant.RETRIEVE_USER, profileList });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
