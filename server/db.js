const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function() {
	mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));
};