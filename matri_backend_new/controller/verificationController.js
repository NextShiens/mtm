const express = require("express");
const app = express();
const VerificationCode = require("../models/verificationCode");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const ResetToken = require("../models/resetToken");
const bcrypt = require("bcrypt");
app.use(express.json());
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const tokens = {};
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const verificationController = {
  async sendCodeToEmail(req, res, next) {
    console.log("sendCodeToEmail function called");
    let emailExists;
    const { email } = req.body;
    console.log(`Received email: ${email}`);

    if (req.originalUrl.includes("/user")) {
      emailExists = await User.exists({ email });
      console.log(`Email exists: ${emailExists}`);
    }
    if (emailExists) {
      const error = new Error("Email Already Registered!");
      error.status = 400;
      console.error(`Error: ${error.message}`);
      return next(error);
    }
    try {
      console.log("Generating verification code");
      let code;
      var codeToSave = new VerificationCode({
        email: email,
        code: Math.floor(1000 + Math.random() * 9000),
      });
      code = await codeToSave.save();
      console.log(`Verification code saved: ${code}`);

      console.log("Creating email transporter");
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: '18cr231@gmail.com', // your email address
          pass: 'ybul ovxm fssz rhst' // your app password
        },
        debug: true, // Enable debug logging
        logger: true // Enable logging
      });

      console.log("Preparing mail options");
      var mailOptions = {
        from: "18cr231@gmail.com",
        to: email,
        subject: "Account Verification OTP",
        text: `Your verification code is ${codeToSave.code}\n\nThank You!\n`,
      };

      console.log("Sending email");
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.error("Error sending email:", err);
          return next(err);
        }
        console.log("Email sent successfully:", info.response);
        return res.status(200).json({
          status: true,
          message: `A verification email has been sent to ${email}`,
        });
      });
    } catch (error) {
      console.error("Caught error:", error);
      return next(error);
    }
  },

  async verifyEmail(req, res, next) {
    console.log("verifyEmail function called");
    let emailExists;
    const { email } = req.body;
    console.log(`Received email: ${email}`);

    if (req.originalUrl.includes("/user")) {
      emailExists = await User.exists({ email });
      console.log(`Email exists: ${emailExists}`);
    }
    if (!emailExists) {
      const error = new Error("User not found!");
      error.status = 400;
      console.error(`Error: ${error.message}`);
      return next(error);
    }
    try {
      console.log("Generating verification code");
      let code;
      var codeToSave = new VerificationCode({
        email: email,
        code: Math.floor(1000 + Math.random() * 9000),
      });
      code = await codeToSave.save();
      console.log(`Verification code saved: ${code}`);

      console.log("Creating email transporter");
      let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false,
        auth: {
          user: 'info@vaishakhimatrimony.com', // your email address
          pass: 'Temp@12345' // your app password
        },
      });

      console.log("Preparing mail options");
      var mailOptions = {
        from: "info@vaishakhimatrimony.com",
        to: email,
        subject: "Account Verification",
        text: `Your verification code is ${codeToSave.code}\n\nThank You!\n`,
      };

      console.log("Sending email");
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.error("Error sending email:", err);
          return next(err);
        }
        console.log("Email sent successfully:", info.response);
        return res.status(200).json({
          status: true,
          message: `A verification email has been sent to ${email}`,
        });
      });
    } catch (error) {
      console.error("Caught error:", error);
      return next(error);
    }
  },

  async confirmEmail(req, res, next) {
    console.log("confirmEmail function called");
    const { code, email } = req.body;
    console.log(`Received code: ${code}, email: ${email}`);

    try {
      const cod = await VerificationCode.findOne({ code: code });
      console.log(`Found verification code: ${cod}`);

      if (!cod) {
        const error = new Error(
          "Incorrect verification code. Please double-check the code and try again."
        );
        error.status = 400;
        console.error(`Error: ${error.message}`);
        return next(error);
      } else {
        if (email == cod.email) {
          console.log("Email verified successfully");
          return res.status(200).json({
            status: true,
            message: "Your account has been successfully verified",
          });
        } else {
          console.log("Email mismatch");
          return res.status(200).json({
            status: true,
            message:
              "We were unable to find a user for this verification. Please enter a correct email!",
          });
        }
      }
    } catch (error) {
      console.error("Caught error:", error);
      return next(error);
    }
  },

  // The ResetLink and resetPassword functions are commented out in the original code,
  // so I'm leaving them commented out here as well.
};

module.exports = verificationController;