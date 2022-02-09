const JOI = require('@hapi/joi');
const ObjectID = require('mongodb').ObjectId;

/**update User address Schema */
const updateAddressSchema = JOI.object().keys({
    address: JOI.string().required()
});

exports.addressUpdate = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ status: false, message: 'User id is not valid.' })
    };
    const result = updateAddressSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json({ status: false, message: result.error.message });
    } else {
        next();
    }
};
