const JOI = require('@hapi/joi');
const ObjectID = require('mongodb').ObjectId;
/**User SignIn/SignUp Schema */
const userSchema = JOI.object().keys({
    name: JOI.string().required(),
    email: JOI.string().email().required(),
    password: JOI.string().required(),
    role: JOI.string().valid("pro", "center", "model").required(),
    location: JOI.string().required(),
});

exports.user = (req, res, next) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json({
            status: false,
            message: result.error.message
        });
    } else {
        next();
    }
};


const userLoginSchema = JOI.object().keys({
    email: JOI.string().email().required(),
    password: JOI.string().required()
});

exports.userLogin = (req, res, next) => {
    const result = userLoginSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json({
            status: false,
            message: result.error.message
        });
    } else {
        next();
    }
};

const changePasswordSchema = JOI.object().keys({
    oldPassword: JOI.string().min(8).required(),
    newPassword: JOI.string().min(8).required()
});

exports.changePassword = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({
            status: false,
            message: 'User id is not valid.'
        })
    };
    const result = changePasswordSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json({
            status: false,
            message: result.error.message
        });
    } else {
        next();
    }
};

const emailUpdateSchema = JOI.object().keys({
    email: JOI.string().email().required(),
});

exports.emailUpdate = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({
            status: false,
            message: 'User id is not valid.'
        })
    };
    const result = emailUpdateSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json({
            status: false,
            message: result.error.message
        });
    } else {
        next();
    }
};