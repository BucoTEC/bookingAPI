import "express-async-errors";
import dotenv from "dotenv";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import ResError from "../utils/ResError.js";

dotenv.config();

// const tokenSecret = process.env.JWT_SECRET;

export const getAllUsers = async (req, res) => {
	const { isAdmin } = req.userData;

	if (!isAdmin) {
		throw new Error(403, "You are not authorized to view all users");
	}
	const allUsers = await User.find();
	if (allUsers.length < 1) {
		throw new ResError(404, "No users in database");
	}
	res.status(200).json({ message: "All users", data: allUsers });
};

export const getSingleUser = async (req, res) => {
	const { id } = req.params;
	const { userId, isAdmin } = req.userData;
	const user = await User.findById(id);
	if (!user) {
		throw new ResError(404, "No user with this id");
	}
	if (user._id == userId || isAdmin) {
		return res.status(200).json({ message: "Your requested user", data: user });
	}
	throw new ResError(403);
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;
	if (id !== req.userData.userId) {
		throw Error("You are not authorized do to that");
	}
	await User.findByIdAndDelete(id);
	res.json("Deleted user succesfuly");
};

// export const updateUser =  async(req,res)=>{
//   const {id} = req.params
//   const updatedUser
// }
//TODO need to add bycrip for passeord encription and JWT for auth
