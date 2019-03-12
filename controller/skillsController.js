/**
 * Created by mayomi on 2/27/19 by 11:01 AM.
 */

const UserModel = require('../models/user');

exports.getAllUserController = async (req, res) => {
	const allUser = await UserModel.find({});
	return res.render ('skills', {users: allUser});
};

exports.getGraphics = async (req, res) => {
	const graphics = await UserModel.find({skill: 'graphics'})
	return res.render ('single-skill', {skills: graphics});
};
exports.getSoftware = async (req, res) => {
	const software = await UserModel.find({skill: 'software'});
	return res.render ('single-skill', {skills: software});
};
exports.getEvent = async (req, res) => {
	const event = await UserModel.findOne({skill: 'event'})
	return res.render ('single-skill', {skills: event});
};

exports.getFashion = async (req, res) => {
	const fashion = await UserModel.find({skill: 'fashion'})
	return res.render ('single-skill', {skills: fashion});
};

exports.getHairStylist = async (req, res) => {
	const hairStylist = await UserModel.find({skill: 'hair stylist'});

	return res.render ('single-skill', {skills: hairStylist});
};

exports.getMakeup = async (req, res) => {
	const makeup = await UserModel.find({skill: 'makeup'});
	return res.render ('single-skill', {skills: makeup});
};
