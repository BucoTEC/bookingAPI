import "express-async-errors";

import Booking from "../models/booking/bookingModel.js";
import User from "../models/userModel.js";

export const allBokings = (req, res) => {
	//check if user admin
	//if not admin look for id in query to return onli current user bookings
	//retunr bookings
	res.json("get all bookings from controller");
};

export const oneBooking = (req, res) => {
	res.json("find onr booking from controller");
};

// TODO CONTINUE WORK HERE
export const addBooking = async (req, res) => {
	const { userId } = req.userData;
	const { day, time } = req.body;
	const currentUser = await User.findById(userId);
	//find user and check if he has two more bookings on the same day
	//create booking
	const newBooking = new Booking({ user: userId, day, time });
	console.log(newBooking);
	//add booking to user
	//return confiramtion message
	currentUser.bookings.push(newBooking._id);
	res.json({
		message: "add book controler",
		currentUser,
		data: {
			userIdinBooking: newBooking.user,
		},
	});
};

export const updateBooking = (req, res) => {
	//get id from path
	//search for booking using path param
	//check if found booking match user id from auth middlwear or is user admin
	//update booking
	res.json("update boking from controller");
};

export const deleteBooking = (req, res) => {
	//get id from path
	//search for booking using path param
	//check if found booking match user id from auth middlwear or is user admin
	//delete booking
	res.json("delete bokking from controller");
};
