const Collaborators = require('../models/Collaborators');
const constant = require('../constants/ConstantMessages');
const file = require('../utils/fileUpload');

/**Create Collaborator */
exports.create = async (req, res) => {
	try {
		if (req.body.picture) {
			req.body.picture = await file.upload(req.body.picture, '', constant.FITSTAR_BUCKET.collaborator);
		}
		const collaborator = await Collaborators.create(req.body);
		if (!collaborator) {
			return res.status(500).json({ status: false, message: constant.SERVER_ERROR });
		}
		return res.status(200).json({ message: constant.CREATE_COLLABORATOR });
	} catch (error) {
		console.log('Error!', error);
		return res.status(500).json({ status: false, message: error.message });
	}
};

/**Update Collaborator */
exports.update = async (req, res) => {
	try {
		if (req.body.picture) {
			req.body.picture = await file.upload(req.body.picture, '', constant.FITSTAR_BUCKET.collaborator);
		}
		const collaborator = await Collaborators.updateOne({ _id: req.params.id }, req.body);
		if (!collaborator) {
			return res.status(500).json({ status: false, message: constant.SERVER_ERROR });
		}
		return res.status(200).json({ message: constant.UPDATE_COLLABORATOR });
	} catch (error) {
		console.log('ERROR:::', error);
		return res.status(500).json({ message: error.message });
	}
};

/**GET Collaborator */
exports.get = async (req, res) => {
	try {
		let totalRecord = await Collaborators.countDocuments({ isDeleted: false });
		let collaborators = await Collaborators.find({ isDeleted: false })
			.sort({ _id: -1 })
			.limit(parseInt(req.params.limit) || 10)
			.skip(parseInt(req.params.offset) - 1)
			.exec();
		return res.status(200).send({ status: true, message: constant.SUCCESS, totalRecord, collaborators });
	} catch (error) {
		console.log('ERROR:::', error);
		return res.status(500).json({ status: false, message: error.message });
	}
};

/**DELETE Collaborator */
exports.delete = async (req, res) => {
	try {
		await Collaborators.updateOne({ _id: req.params.id }, { $set: { isDeleted: true } });
		return res.status(200).send({ status: true, message: constant.DELETE_COLLABORATOR });
	} catch (error) {
		console.log('ERROR:::', error);
		return res.status(500).json({ status: false, message: error.message });
	}
};

/**Search Collaborator */
exports.search = async (req, res) => {
	try {
		let totalRecord = await Collaborators.countDocuments({ isDeleted: false });
		let searchItem = req.params.search;
		let collaborators = await Collaborators.aggregate([
			{
        $match : {
          $and: [
            { title: { $regex: searchItem, $options: "i" } },
            { isDeleted: false }
          ]
        }
			}
		]).sort({ _id: -1 })
		.limit(parseInt(req.params.limit) || 10)
		.skip(parseInt(req.params.offset) - 1)
		.exec();

		return res.status(200).send({ status: true, message: constant.RETRIEVE_COLLABORATOR, collaborators });
	} catch (error) {
		console.log('ERROR:::', error);
		return res.status(500).json({ status: false, message: error.message });
	}
};
