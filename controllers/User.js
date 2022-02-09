const User = require('../models/User');
const userHelper = require('../helpers/user');
const bcrypt = require('bcrypt');
const constant = require('../constants/ConstantMessages')
const { upload } = require('../utils/fileUpload');

exports.profileBasic = async (req, res) => {
    try {
        return;
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

exports.profileAbout = async (req, res) => {
    try {
        let body = req.body;
        if (Object.keys(body).length === 0) {
            return res.status(200).json({ message: 'Nothing to update' });
        }
        if (typeof body.backgroundImage === "object") {
            body.backgroundImage = await upload(body.backgroundImage.file, body.backgroundImage.name, body.backgroundImage.type);
        }
        if (typeof body.image === "object") {
            body.image = await upload(body.image.file, body.image.name, body.image.type);
        }
        await User.updateOne({ _id: req.params.id }, body);
        let user = await User.findById(req.params.id);
        return res.status(200).send({ message: constant.PROFILE_UPDATE, user });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

exports.profileVideo = async (req, res) => {
    try {
        return;
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

exports.profilePortfolio = async (req, res) => {
    try {
        return;
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

exports.profileGallery = async (req, res) => {
    try {
        return;
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

exports.profileAds = async (req, res) => {
    try {
        return;
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

exports.profileContactUs = async (req, res) => {
    try {
        return;
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


exports.getProfile = async (req, res) => {
    try {
        let user = await User.find();
        return res.status(200).send({ message: constant.SUCCESS, user: user[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

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
}

exports.emailCheck = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.params.email });
        if (user) {
            return res.status(200).json({ status: true });
        }
        return res.status(200).json({ status: false });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
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
}

exports.updateAddress = async (req, res) => {
    try {
        let body = req.body;
        let user = await User.findById({ _id: req.params.id });
        if (user) {
            user.publicAddress = body.publicAddress;
            await user.save();
            return res.status(200).send({ message: "Address successfully added." });
        } else {
            return res.status(401).send({ message: "Invalid user" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}




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
      let blogs = await Blogs.find();
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


