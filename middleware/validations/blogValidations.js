const JOI = require("@hapi/joi");
const ObjectID = require("mongodb").ObjectId;
/**User SignIn/SignUp Schema */
const createSchema = JOI.object().keys({
  title: JOI.string().required(),
  description: JOI.string().required(),
  authorName: JOI.string().required(),
  category: JOI.string()
    .valid(
      "Nutrition",
      "Recipies",
      "Workouts",
      "Reviews",
      "Podcasts",
      "Music",
      "News"
    )
    .required(),
  featuredImageOne: JOI.string().required(),
  featuredImageTwo: JOI.string().required(),
  authorImage: JOI.string().required(),
  videoLink: JOI.string().required(),
  details: JOI.string().required(),
});

exports.createBlog = (req, res, next) => {
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
