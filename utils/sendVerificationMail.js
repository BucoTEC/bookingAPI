import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const domainName = process.env.CURRENT_API_ADRESS; // name of current domein
const senderEmail = process.env.SENDER_EMAIL; // sender email adress, prefer outlook
const senderEmailPassword = process.env.SENDER_EMAIL_PASSWORD; //sender email password

const sendVerificationMail = (reciver, token) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: senderEmail,
			pass: senderEmailPassword,
		},
	});

	const options = {
		from: senderEmail,
		to: reciver,
		subject: "email from booking api",
		text: "fix run on reload your token",
		html: `<b>Hello world?</b> 
         <p>Follow click on the link bellowe to verifi email</p> 
         <a href="${domainName}/api/auth/confirm/${token}">Verifi adress</a>`,
	};

	transporter.sendMail(options, (err, info) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log("Sent email: " + info.response);
	});
};

export default sendVerificationMail;
