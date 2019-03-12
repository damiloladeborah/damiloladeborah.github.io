const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema({
		email: {
			type: String,
			lowercase: true,
			unique: true,
		},
		first_name: String,
		last_name: String,
		password: {
			type: String,
		},
		username: String,
		phone_number: String,
		skill: String,
		profile_pic: String,
		short_bio: String,
	},
	{
		timestamps: true
	});

module.exports = mongoose.model('user', UserSchema);
