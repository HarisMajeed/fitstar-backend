const mongoose = require('mongoose');
require('dotenv').config();

(async function dbConnect() {
	try {
		const db = await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log("MongoDB successfully connected!");
	} catch (error) {
		console.log(error);
	}
})();
