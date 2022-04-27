import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import "express-async-errors";

import User from "../models/user/userModel.js";
import PendingUser from "../models/user/pendingUserModel.js";

import sendVerificationMail from "../utils/sendVerificationMail.js";

dotenv.config();

const tokenSecret = process.env.JWT_SECRET;

export const singIn = async (req, res) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (!existingUser) {
		throw new Error("Wrong credentials, user not found");
	}
	let validPassword = false;
	validPassword = await bcrypt.compare(password, existingUser.password);

	if (!validPassword) {
		throw new Error("Wrong credentials, user not found");
	}

	const token = jwt.sign(
		{
			userId: existingUser.id,
			email: existingUser.email,
			isAdmin: existingUser.isAdmin,
		},
		tokenSecret
		// { expiresIn: "1h" }
	);
	res.json({
		token,
		userId: existingUser._id,
		username: existingUser.username,
	});
};

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new Error("User already exists");
	}
	const hashedPassword = await bcrypt.hash(password, 12);

	const newPendingUser = new PendingUser({
		username,
		email,
		password: hashedPassword,
	});
	await newPendingUser.save();

	const token = jwt.sign(
		{
			userId: newPendingUser._id,
			email: newPendingUser.email,
			isAdmin: newPendingUser.isAdmin,
		},
		tokenSecret,
		{ expiresIn: "2m" }
	);

	!token && next();
	res.json({
		userId: newPendingUser._id,
		email: newPendingUser.email,
		isAdmin: newPendingUser.isAdmin,
		token,
	});
};
sendVerificationMail();
export const confirmRegister = (req, res) => {
	res.json("confirm register");
};
