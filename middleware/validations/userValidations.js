const JOI = require("@hapi/joi");
const ObjectID = require("mongodb").ObjectId;

/**update User address Schema */
const updateAddressSchema = JOI.object().keys({
  address: JOI.string().required(),
});

exports.addressUpdate = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ status: false, message: "User id is not valid." });
  }
  const result = updateAddressSchema.validate(req.body);
  if (result.error) {
    return res
      .status(400)
      .json({ status: false, message: result.error.message });
  } else {
    next();
  }
};

const userSchema = JOI.object().keys({
  fullName: JOI.string().required(),
  email: JOI.string().email().required(),
  password: JOI.string().required(),
  role: JOI.string().valid("pro", "center", "model").required(),
  location: JOI.object({
    country:JOI.string(),
    state:JOI.string(),
    city:JOI.string(),
  }),
  image: JOI.string().required(),
  referId: JOI.string(),
});

exports.userCreate = (req, res, next) => {
  const result = userSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      status: false,
      message: result.error.message,
    });
  } else {
    next();
  }
};
