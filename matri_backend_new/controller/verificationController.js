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

// const userTypeFunction = async function (userModel, email, newPassword) {
//   let user;
//   if (userModel === "Laboratory") {
//     user = await Laboratory.find({ email });
//   } else if (userModel === "Pharmacy") {
//     user = await Pharmacy.find({ email });
//   } else if (userModel === "Doctor") {
//     user = await Doctor.find({ email });
//   } else if (userModel === "Hospital") {
//     user = await Hospital.find({ email });
//   } else if (userModel === "Ambulance") {
//     user = await AmbulanceCompany.find({ email });
//   } else if (userModel === "Physiotherapist") {
//     user = await Physiotherapist.find({ email });
//   } else if (userModel === "Nutritionist") {
//     user = await Nutritionist.find({ email });
//   } else if (userModel === "Paramedic") {
//     user = await Paramedic.find({ email });
//   } else if (userModel === "Psychologist") {
//     user = await Psychologist.find({ email });
//   } else if (userModel === "Agency") {
//     user = await Agency.find({ email });
//   } else if (userModel === "RentCar") {
//     user = await RentCar.find({ email });
//   } else if (userModel === "Donation") {
//     user = await Donation.find({ email });
//   } else if (userModel === "Hotel") {
//     user = await Hotel.find({ email });
//   } else if (userModel === "Insurance") {
//     user = await Insurance.find({ email });
//   }
//   if (!user) {
//     return res
//       .status(404)
//       .json({ status: "Failure", message: "User not found" });
//   }
//   console.log(user);
//   // In a real application, you should update the user's password in your database
//   // For this demo, we'll just log the new password
//   console.log(`Password for ${email} reset to: ${newPassword}`);

//   // Delete the token from the tokens object after it's used
//   const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//   if (userModel === "Laboratory") {
//     await Laboratory.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Pharmacy") {
//     await Pharmacy.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Doctor") {
//     await Doctor.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Hospital") {
//     await Hospital.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Ambulance") {
//     await AmbulanceCompany.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Physiotherapist") {
//     await Physiotherapist.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Nutritionist") {
//     await Nutritionist.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Paramedic") {
//     await Paramedic.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Psychologist") {
//     await Psychologist.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Agency") {
//     await Agency.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "RentCar") {
//     await RentCar.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Donation") {
//     await Donation.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Hotel") {
//     await Hotel.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   } else if (userModel === "Insurance") {
//     await Insurance.updateOne(
//       { email: email },
//       { password: hashedNewPassword },
//       { runValidators: true }
//     );
//   }
// };

const verificationController = {
  async sendCodeToEmail(req, res, next) {
    let emailExists;
    const { email } = req.body;
    if (req.originalUrl.includes("/user")) {
      emailExists = await User.exists({ email });
    }
    if (emailExists) {
      const error = new Error("Email Already Registered!");
      error.status = 400;
      return next(error);
    }
    try {
      let code;
      var codeToSave = new VerificationCode({
        email: email,
        code: Math.floor(1000 + Math.random() * 9000),
      });
      code = codeToSave.save();

      // Send email (use credintials of SendGrid)
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "umairyaqub31@gmail.com",
          pass: "kajhaukzwygsfxau",
        },
      });
      var mailOptions = {
        from: "no-reply@example.com",
        to: email,
        subject: "Account Verification",
        text:
          "Your verification code is " + codeToSave.code + "\n\nThank You!\n",
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return next(err);
        }

        return res.status(200).json({
          status: true,
          message: ` A verification email has been sent to ${email}`,
        });
      });
    } catch (error) {
      return next(error);
    }
  },

  async verifyEmail(req, res, next) {
    let emailExists;
    const { email } = req.body;
    if (req.originalUrl.includes("/user")) {
      emailExists = await User.exists({ email });
    }
    if (!emailExists) {
      const error = new Error("User not found!");
      error.status = 400;
      return next(error);
    }
    try {
      let code;
      var codeToSave = new VerificationCode({
        email: email,
        code: Math.floor(1000 + Math.random() * 9000),
      });
      code = codeToSave.save();

      // Send email (use credintials of SendGrid)
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "umairyaqub31@gmail.com",
          pass: "kajhaukzwygsfxau",
        },
      });
      var mailOptions = {
        from: "no-reply@example.com",
        to: email,
        subject: "Account Verification",
        text:
          "Your verification code is " + codeToSave.code + "\n\nThank You!\n",
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return next(err);
        }

        return res.status(200).json({
          status: true,
          message: ` A verification email has been sent to ${email}`,
        });
      });
    } catch (error) {
      return next(error);
    }
  },

  async confirmEmail(req, res, next) {
    const { code, email } = req.body;
    VerificationCode.findOne({ code: code }, function (err, cod) {
      if (!cod) {
        const error = new Error(
          "Incorrect verification code. Please double-check the code and try again."
        );
        error.status = 400;
        return next(error);
      } else {
        if (email == cod.email) {
          return res.status(200).json({
            status: true,
            message: "Your account has been successfully verified",
          });
        } else {
          return res.status(200).json({
            status: true,
            message:
              "We were unable to find a user for this verification. Please enter a correct email!",
          });
        }
      }
    });
  },

  // async ResetLink(req, res, next) {
  //   try {
  //     console.log("object")
  //     let { email } = req.body;
  //     let existingUser;
  //     let userType;
  //     let userTypeInUrl;
  //     if (!email) {
  //       return res
  //         .status(404)
  //         .json({ status: "failure", message: "Please enter email" });
  //     }
  //     if (req.originalUrl.includes("/lab")) {
  //       try {
  //         existingUser = await Laboratory.findOne({ email });
  //         userType = "Laboratory";
  //         //  userTypeInUrl = "lab"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/pharm")) {
  //       try {
  //         existingUser = await Pharmacy.findOne({ email });
  //         userType = "Pharmacy";
  //         console.log("2nd")
  //         // userTypeInUrl = "pharm"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/doc")) {
  //       try {
  //         existingUser = await Doctor.findOne({ email });
  //         userType = "Doctor";
  //         // userTypeInUrl = "doc"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/hosp")) {
  //       try {
  //         existingUser = await Hospital.findOne({ email });
  //         userType = "Hospital";
  //         // userTypeInUrl = "hosp"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/ambulance")) {
  //       try {
  //         existingUser = await AmbulanceCompany.findOne({ email });
  //         userType = "Ambulance";
  //         // userTypeInUrl = "ambulance"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/physio")) {
  //       try {
  //         existingUser = await Physiotherapist.findOne({ email });
  //         userType = "Physiotherapist";
  //         // userTypeInUrl = "physio"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/nutritionist")) {
  //       try {
  //         existingUser = await Nutritionist.findOne({ email });
  //         userType = "Nutritionist";
  //         // userTypeInUrl = "nutritionist"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/paramedic")) {
  //       try {
  //         existingUser = await Paramedic.findOne({ email });
  //         userType = "Paramedic";
  //         // userTypeInUrl = "paramedic"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/psychologist")) {
  //       try {
  //         existingUser = await Psychologist.findOne({ email });
  //         userType = "Psychologist";
  //         // userTypeInUrl = "psychologist"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/agency")) {
  //       try {
  //         existingUser = await Agency.findOne({ email });
  //         userType = "Agency";
  //         // userTypeInUrl = "agency"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/rentCar")) {
  //       try {
  //         existingUser = await RentCar.findOne({ email });
  //         userType = "RentCar";
  //         // userTypeInUrl = "rentCar"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/donation")) {
  //       try {
  //         existingUser = await Donation.findOne({ email });
  //         userType = "Donation";
  //         // userTypeInUrl = "rentCar"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/hotel")) {
  //       try {
  //         existingUser = await Hotel.findOne({ email });
  //         userType = "Hotel";
  //         // userTypeInUrl = "rentCar"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     } else if (req.originalUrl.includes("/insurance")) {
  //       try {
  //         existingUser = await Insurance.findOne({ email });
  //         userType = "Insurance";
  //         // userTypeInUrl = "rentCar"
  //       } catch (error) {
  //         return next(error);
  //       }
  //     }
  //     console.log("anything")

  //     if (!existingUser) {
  //       return res
  //         .status(404)
  //         .json({ status: "failure", message: "Email not found" });
  //     }
  //     // Generate a random password reset token
  //     const resetToken = uuidv4();
  //     // Save the resetToken and associated email in your database
  //     const token = new ResetToken({ token: resetToken, email, userType });

  //     tokens[resetToken] = { email, userType };
  //     console.log(tokens);
  //     // Create a reset link with the token
  //     const baseUrl = "http://localhost:3000";
  //     let resetLink;
  //     if (userType == "Ambulance") {
  //       resetLink = `${baseUrl}/homeservicesambulanceservices//update-password?token=${resetToken}`;
  //     } else if (userType == "Physiotherapist") {
  //       resetLink = `${baseUrl}/homeservices/physiotherapist/update-password?token=${resetToken}`;
  //     } else if (userType == "Nutritionist") {
  //       resetLink = `${baseUrl}/homeservices/nutritionist/update-password?token=${resetToken}`;
  //     } else if (userType == "Paramedic") {
  //       resetLink = `${baseUrl}/homeservices/paramedicstaff/update-password?token=${resetToken}`;
  //     } else if (userType == "Psychologist") {
  //       resetLink = `${baseUrl}/homeservices/psychologist/update-password?token=${resetToken}`;
  //     } else if (userType == "Laboratory") {
  //       resetLink = `${baseUrl}/laboratory/update-password?token=${resetToken}`;
  //     } else if (userType == "Hospital") {
  //       resetLink = `${baseUrl}/medicalservices/hospital/update-password?token=${resetToken}`;
  //     } else if (userType == "Pharmacy") {
  //       resetLink = `${baseUrl}/pharmacy/update-password?token=${resetToken}`;
  //     } else if (userType == "Doctor") {
  //       resetLink = `${baseUrl}/medicalservices/doctor/update-password?token=${resetToken}`;
  //     } else if (userType == "RentCar") {
  //       resetLink = `${baseUrl}/traveltourism/rentAcar/update-password?token=${resetToken}`;
  //     } else if (userType == "Agency") {
  //       resetLink = `${baseUrl}/traveltourism/travelAgency/update-password?token=${resetToken}`;
  //     } else if (userType == "Donation") {
  //       resetLink = `${baseUrl}/donation/update-password?token=${resetToken}`;
  //     } else if (userType == "Hotel") {
  //       resetLink = `${baseUrl}/traveltourism/hotel/forgot-password?token=${resetToken}`;
  //     } else if (userType == "Insurance") {
  //       resetLink = `${baseUrl}/donation/update-password?token=${resetToken}`;
  //     }

  //     var transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: "berryboostbb",
  //         pass: "wwdrzfmlrfjprypp",
  //       },
  //     });
  //     var mailOptions = {
  //       from: "no-reply@example.com",
  //       to: email,
  //       subject: "Reset Password",
  //       html: `<p>Click the link below to reset your password:</p>${resetLink}`,
  //     };
  //     transporter.sendMail(mailOptions, function (err) {
  //       if (err) {
  //         return next(err);
  //       }

  //       return res.status(200).json({
  //         status: true,
  //         message: `Password reset link sent to ${email}`,
  //       });
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return res
  //       .status(500)
  //       .json({ status: "failure", message: "Internal server error" });
  //   }
  // },

  // async resetPassword(req, res, next) {
  //   try {
  //     const resetSchema = Joi.object({
  //       newPassword: Joi.string().pattern(passwordPattern).required(),
  //     });

  //     const { error } = resetSchema.validate(req.body);

  //     // 2. if error in validation -> return error via middleware
  //     if (error) {
  //       return next(error);
  //     }
  //     const token = req.query.token;
  //     const { newPassword } = req.body;
  //     if (!newPassword) {
  //       res.json({
  //         status: "Failure",
  //         message: `Please enter new password`,
  //       });
  //       return;
  //     }
  //     // Check if the provided token exists in the tokens object
  //     const object = tokens[token];
  //     if (!object) {
  //       return res
  //         .status(404)
  //         .json({ status: "failure", message: "Invalid token" });
  //     }
  //     const email = object.email;
  //     const userType = tokens[token];
  //     console.log(tokens);

  //     userModel = userType.userType;

  //     await userTypeFunction(userModel, email, newPassword);

  //     delete tokens[token];
  //     return res.json({
  //       status: "success",
  //       message: "Password reset successful",
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return res
  //       .status(500)
  //       .json({ status: "failure", message: "Internal server error" });
  //   }
  // },
};

module.exports = verificationController;
