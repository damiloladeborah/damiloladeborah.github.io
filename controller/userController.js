/**
 * Created by mayomi on 2/22/19 by 1:20 PM.
 */
const UserModel = require('../models/user');

exports.registerUser =  (req, res) => {
	const {
		first_name, last_name, email,
		username, password, password2,
		skill, short_bio, phone_number
	} = req.body;

	let image;
	if(req.file){
		image = req.file.originalname;
	}

	switch (true) {
		case !first_name:
			req.flash('message', 'First name is required');
			return res.redirect('back');
		case !last_name:
			req.flash('message', 'Last name is required');
			return res.redirect('back');
		case !username:
			req.flash('message', 'Username is required');
			return res.redirect('back');
		case !email:
			req.flash('message', 'Email is required');
			return res.redirect('back');
		case !short_bio:
			req.flash('message', 'Write something in the sell yourself field');
			return res.redirect('back');
		case !skill:
			req.flash('message', 'Skill is required');
			return res.redirect('back');
		case !phone_number:
			req.flash('message', 'Phone Number is required');
			return res.redirect('back');
		case password !== password2:
			req.flash('message', 'password not match');
			return res.redirect('back');
		default:
			'';
	}

	const newuser = UserModel({
		first_name: first_name,
		last_name: last_name,
		email: email,
		password: password,
		skill: skill,
		phone_number: phone_number,
		short_bio: short_bio,
		username: username,
		profile_pic: image
	});

	newuser.save().then(result => {
		req.session.user = result;
		res.redirect('/profile');
	}).catch(error => {
		if (error.code = 'E11000') {
			if (error.message.indexOf('email') !== -1) {
				req.flash('message', 'Email is duplicated');
				return res.redirect('back');
			}
		}
		req.flash('message', 'Some thing went wrong, please try again');
		res.redirect('back');
	})
};

exports.showLogin = (req, res) => {
	return res.render('signin', {message: req.flash('message'), user: req.session.user})
}

exports.loginController = async (req, res) => {

	const {username, password} = req.body;
	try{
		const user = await UserModel.findOne({username: username, password: password});

		if(user) {
			req.session.user = user;
			res.redirect('/profile');
		} else {
			req.flash('message', 'User not found');
			res.redirect('back');
		}
	} catch (e) {
		req.flash('message', 'User not found');
		res.redirect('back');
	}
};

exports.showProfile = (req, res) => {
	const user = req.session.user;
	if (user) {
		res.render('profile', {message: req.flash('message'), user: user})
	}
};
