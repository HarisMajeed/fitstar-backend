const JOI = require("@hapi/joi");
const ObjectID = require("mongodb").ObjectId;
/**User SignIn/SignUp Schema */
const createSchema = JOI.object().keys({
  title: JOI.string().required(),
  subTitle: JOI.string().required(),
  picture: JOI.string().required(),
  instagram: JOI.string().required(),
  facebook: JOI.string().required(),
  youtube: JOI.string().required(),
  tiwtter: JOI.string().required()
});

exports.createCollaborator= (req, res, next) => {
  const result = createSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      status: false,
      message: result.error.message,
    });
  } else {
    next();
  }
};
