const User = require("../models/User");
const userHelper = require("../helpers/user");
const bcrypt = require("bcrypt");
const constant = require("../constants/ConstantMessages");
const file = require("../utils/fileUpload");
const Profiles = require("../models/Profiles");
const mailer = require("../utils/mailer");

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
    let beforePromises = [];
    let afterPromises = [];
    let beforePromisesRes = [];
    let afterPromisesRes = [];
    if (req.body.portfolio) {
      beforePromises = req.body.portfolio.map(async (item) => {
        return file.upload(
          item.imageBefore ? item.imageBefore : "",
          "",
          constant.FITSTAR_BUCKET.user
        );
      });
      beforePromisesRes = await Promise.all(beforePromises);
      beforePromisesRes.forEach((item, i) => {
        req.body.portfolio[i].imageBefore = item;
      });
      afterPromises = req.body.portfolio.map(async (item) => {
        return file.upload(
          item.imageAfter ? item.imageAfter : "",
          "",
          constant.FITSTAR_BUCKET.user
        );
      });
      afterPromisesRes = await Promise.all(afterPromises);
      afterPromisesRes.forEach((item, i) => {
        req.body.portfolio[i].imageAfter = item;
      });
      /** End */
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
    let myProfile = await Profiles.findOne({
      user: req.user._id,
      activeRole: { $ne: "" },
    });
    return res.status(200).send({ message: constant.SUCCESS, myProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    let profile = await Profiles.findOne({ _id: req.params.id });
    return res.status(200).send({ message: constant.SUCCESS, profile });
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
    console.log(req);
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
    //await mailer.signUpEmail(req.body.email);

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
      .skip(parseInt(req.params.offset) - 1)
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
  let searchItem = req.params.search;
  let totalRecords = await User.countDocuments({ isDeleted: false });
  try {
    let users = await User.aggregate([
      {
        $match: {
          $and: [
            { fullName: { $regex: searchItem, $options: "i" } },
            { isDeleted: false },
            { role: { $ne: "admin" } },
          ],
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(parseInt(req.params.limit) || 10)
      .skip(parseInt(req.params.offset) - 1)
      .exec();
    return res.status(200).send({
      status: true,
      message: constant.RETRIEVE_USER,
      totalRecords,
      users,
    });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
/**GET User By role */
exports.getByRole = async (req, res) => {
  console.log("user by role", req.params);
  try {
    let users = await Profiles.find({ role: req.params.role });
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
    const { name, location, specialities,city , country, state} = req.query;
    const role = req.query.role;

    let specialityQuery = [];
    if (role) {
      specialityQuery.push({ role });
    }
    if (name) {
      specialityQuery.push({
        fullName: {
          $regex: name,
          $options: "i",
        },
      });
    }
    if (city) {
      specialityQuery.push({
        "location.city": {
          $regex: city,
          $options: "i",
        },
      });
    }
	if (country) {
		specialityQuery.push({
		  "location.country": {
			$regex: country,
			$options: "i",
		  },
		});
	  }
	  if (state) {
		specialityQuery.push({
		  "location.state": {
			$regex: state,
			$options: "i",
		  },
		});
	  }
    if (role == "pro" && specialities) {
      specialityQuery.push({
        "proAbout.qualifications.specialities": {
          $in: [specialities],
        },
      });
    }

    if (role == "model" && specialities) {
      specialityQuery.push({
        "centerAbout.centerAboutSchema.specialities": {
          $in: [specialities],
        },
      });
    }
    let users = await Profiles.aggregate([
      {
        $match: {
          $and: specialityQuery,
        },
      },
    ]);
    // let users = await Profiles.find({ role: 'pro' });
    // let arr = [];
    // users.map((item) => {
    // 	if (
    // 		item.location === 'islamabad' &&
    // 		item.proAbout.qualifications.specialities.map((item) => {
    //                if(item === 'aerobics') {
    // 				   return item
    // 			   }
    // 		})
    // 	  && item.fullName === 'Hamza'
    // 	)
    // 	{
    // 		arr.push(item);
    // 	}
    // });
    ///	res.json(arr);
    return res
      .status(200)
      .send({ status: true, message: constant.RETRIEVE_USER, users });
  } catch (error) {
    console.log("ERROR:::", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

/** Admin Dashboard search and get*/

exports.getUserByRole = async (req, res) => {
  try {
    let searchItem = req.params.role;
    let totalRecords = await User.countDocuments({
      isDeleted: false,
      role: searchItem,
    });
    let users = await User.find({
      $and: [{ role: searchItem }, { isDeleted: false }],
    })
      .sort({ _id: -1 })
      .limit(parseInt(req.params.limit) || 10)
      .skip(parseInt(req.params.offset) - 1)
      .exec();
    return res
      .status(200)
      .send({ status: true, message: constant.SUCCESS, totalRecords, users });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    return res
      .status(200)
      .send({ status: true, message: constant.SUCCESS, users });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.searchUser = async (req, res) => {
  try {
    let searchItem = req.params.search;
    try {
      let users = await User.aggregate([
        {
          $match: {
            $and: [
              { fullName: { $regex: searchItem, $options: "i" } },
              { isDeleted: false },
              { role: { $ne: "admin" } },
            ],
          },
        },
      ])
        .sort({ _id: -1 })
        .limit(parseInt(req.params.limit) || 10)
        .skip(parseInt(req.params.offset) - 1)
        .exec();
      let totalRecords = users.length;
      return res.status(200).send({
        status: true,
        message: constant.RETRIEVE_USER,
        users,
        totalRecords,
      });
    } catch (error) {
      console.log("ERROR:::", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.contactUser = async (req, res) => {
  try {
    if (req.body.to && req.body.from) {
      const check = await mailer.contactUsEmail(req.body);
      res.status(200).json({ message: "Email Successfully send" });
    } else {
      return res
        .status(200)
        .json({ message: "Sender / Reciver Email Required." });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
