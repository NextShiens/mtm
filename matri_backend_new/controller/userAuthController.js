const express = require("express");
const app = express();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const JWTService = require("../services/JWTService.js");
const RefreshToken = require("../models/token.js");
const Subscription = require("../models/subscribtion.js");
const AccessToken = require("../models/accessToken.js");
const { sendchatNotification } = require("../firebase/service/index.js");
const jwt = require("jsonwebtoken");
const user = require("../models/user.js");

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const userAuthController = {
  //.......................................Register..................................//
  async register(req, res, next) {
    const userRegisterSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      // password: Joi.string().pattern(passwordPattern).required(),
      password: Joi.string().required(),
      fcmToken: Joi.string(),
    });

    const { error } = userRegisterSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { name, email, phone, password, fcmToken } = req.body;
    const emailExists = await User.findOne({ email });
    console.log(emailExists);
    if (emailExists) {
      const error = {
        status: 401,
        message: "Email Already Registered",
      };

      return next(error);
    }

    const phoneExists = await User.findOne({ phone });
    // console.log(phoneExists);
    if (phoneExists) {
      const error = {
        status: 401,
        message: "Phone Number Already Registered",
      };

      return next(error);
    }
    let accessToken;
    let refreshToken;
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    try {
      const userToRegister = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        fcmToken,
      });

      user = await userToRegister.save();

      // token generation
      accessToken = JWTService.signAccessToken({ _id: user._id }, "365d");

      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "365d");
    } catch (error) {
      return next(error);
    }

    // store refresh token in db
    await JWTService.storeRefreshToken(refreshToken, user._id);
    await JWTService.storeAccessToken(accessToken, user._id);

    // 6. response send

    // const userDto = new usertorDto(user);

    return res.status(201).json({ user: user, auth: true, token: accessToken });
  },
  //.......................................Login..................................//

  async login(req, res, next) {
    const userLoginSchema = Joi.object({
      email: Joi.string().min(5).max(30).required(),
      password: Joi.string().required(),
      fcmToken: Joi.string(),
    });
    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { email, password, fcmToken } = req.body;
    console.log(password);

    let user;

    try {
      // match username
      user = await User.findOne({ email: email });
      if (user == null) {
        const error = {
          status: 401,
          message: "Invalid email",
        };
        return next(error);
      } else {
        //update fcmToken
        if (fcmToken && user?.fcmToken !== fcmToken) {
          Object.keys(user).map((key) => (user["fcmToken"] = fcmToken));
          let update = await user.save();
        } else {
          console.log("same Token");
        }
      } // match password

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        const error = {
          status: 401,
          message: "Invalid Password",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const accessToken = JWTService.signAccessToken({ _id: user._id }, "365d");
    const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "365d");
    // update refresh token in database
    try {
      await RefreshToken.updateOne(
        {
          userId: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    try {
      await AccessToken.updateOne(
        {
          userId: user._id,
        },
        { token: accessToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ user: user, auth: true, token: accessToken });
  },

  async changePassword(req, res, next) {
    const userId = req.query.id;

    const userChangePasswordSchema = Joi.object({
      password: Joi.string().required(),
      newPassword: Joi.string().required(),
    });
    const { error } = userChangePasswordSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { password, newPassword } = req.body;
   

    let user;

    try {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid current password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.json({ message: "Password changed successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  async forgotPassword(req, res, next) {
    // const userId = req.query.id;

    const userChangePasswordSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = userChangePasswordSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { email, password } = req.body;

    let user;

    try {
      user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   return res.status(400).json({ message: "Invalid current password" });
      // }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();

      res.json({ message: "Password changed successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  async deleteAccount(req, res, next) {
    const userDeleteSchema = Joi.object({
      email: Joi.string().min(5).max(30).required(),
      userId: Joi.string().required(),
    });
    const { error } = userDeleteSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { email, userId } = req.body;
    let user;
    try {
      // match username
      user = await User.findOne({ email: email });

      if (user == null) {
        const error = {
          status: 401,
          message: "Invalid email",
        };
        return next(error);
      } else {
        let id = user._id.toString();

        if (id == userId) {
          User.findByIdAndDelete(userId)
            .then(() => {
              res.json({ message: "User deleted successfully" });
            })
            .catch((err) => {
              return res.status(404).json({ message: "User not found" });
            });
        } else {
          const error = {
            status: 401,
            message: "Invalid email",
          };
          return next(error);
        }
      }
    } catch (error) {
      return next(error);
    }
  },

  async socialLogin(req, res, next) {
    const userLoginSchema = Joi.object({
      email: Joi.string().min(5).max(30).required(),
      // password: Joi.string().required(),
      fcmToken: Joi.string(),
    });
    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { email, fcmToken } = req.body;

    let user;

    try {
      // match username
      user = await User.findOne({ email: email });

      if (user == null) {
        const error = {
          status: 401,
          message: "Invalid email",
        };
        return next(error);
      } else {
        //update fcmToken
        if (fcmToken && user?.fcmToken !== fcmToken) {
          Object.keys(user).map((key) => (user["fcmToken"] = fcmToken));

          let update = await user.save();
        } else {
          console.log("same Token");
        }
      }

      // match password

      // const match = await bcrypt.compare(password, user.password);

      // if (!match) {
      //   const error = {
      //     status: 401,
      //     message: "Invalid Password",
      //   };

      //   return next(error);
      // }
    } catch (error) {
      return next(error);
    }

    const accessToken = JWTService.signAccessToken({ _id: user._id }, "365d");
    const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "365d");
    // update refresh token in database
    try {
      await RefreshToken.updateOne(
        {
          userId: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    try {
      await AccessToken.updateOne(
        {
          userId: user._id,
        },
        { token: accessToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ user: user, auth: true, token: accessToken });
  },

  //.......................................CompleteProfile..................................//

  async completeProfile(req, res, next) {
   
    try {
      const userSchema = Joi.object({
        gender: Joi.string().valid("male", "female").required(),
        DOB: Joi.string().required(),
        occupation: Joi.string().required(),
        employedIn: Joi.string().required(),
        annualIncome: Joi.string().required(),
        workLocation: Joi.string().required(),
        age: Joi.string().required(),
        maritalStatus: Joi.string().required(),
        religion: Joi.string().required(),
        height: Joi.string().required(),
        motherTongue: Joi.string().required(),
        sect: Joi.string().required(),
        city: Joi.string().required(),
        highestDegree: Joi.string().required(),
        partnerPreference: Joi.object({
          partnerAge: Joi.string().optional(),
          partnerMaritalStatus: Joi.string().optional(),
          partnerHeight: Joi.string().optional(),
          education: Joi.string().optional(),
          partnerOccupation: Joi.string().optional(),
          partnerMotherTongue: Joi.string().optional(),
          partnerAnnualIncome: Joi.string().optional(),
          partnerSect: Joi.string().optional(),
          partnerCity: Joi.string().optional()
        }),
      });

      const { error } = userSchema.validate(req.body);

      if (error) {
        return next(error);
      };
      const userId = req.user._id;

      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { $set: req.body },
          { new: true }
        );

        if (!user) {
          const error = new Error("User not found!");
          error.status = 404;
          return next(error);
        }
        user.profileCompleted = true;
        await user.save();
        return res
          .status(200)
          .json({ message: "User updated successfully", user });
      } catch (error) {
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  },

  async updateProfile(req, res, next) {
    const userSchema = Joi.object({
      phone: Joi.string(),
      name: Joi.string(),
      DOB: Joi.string(),
      userImages: Joi.array(),
      email: Joi.string().email(),
      gender: Joi.string(),
      height: Joi.string(),
      city: Joi.string(),
      motherTongue: Joi.string(),
      partner: Joi.string(),
      highestDegree: Joi.string(),
      occupation: Joi.string(),
      maritalStatus: Joi.string(),
      employedIn: Joi.string(),
      annualIncome: Joi.string(),
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const { phone, name, DOB, userImages , email, gender, height, city, motherTongue, partner, highestDegree, occupation, maritalStatus, employedIn, annualIncome} = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found!");
      error.status = 404;
      return next(error);
    }

    // Update only the provided fields
    if (phone) user.phone = phone;
    if (name) user.name = name;
    if (DOB) user.DOB = DOB;
    if (userImages) user.userImages = userImages;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (height) user.height = height;
    if (city) user.city = city;
    if (motherTongue) user.motherTongue = motherTongue;
    if (partner) user.partner = partner;
    if (highestDegree) user.highestDegree = highestDegree;
    if (occupation) user.occupation = occupation;
    if (maritalStatus) user.maritalStatus = maritalStatus;
    if (employedIn) user.employedIn = employedIn;
    if (annualIncome) user.annualIncome = annualIncome;
    // Save the updated test
    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  },

  async updateActiveStatus(req, res, next) {
    const userSchema = Joi.object({
      isActive: Joi.boolean(),
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const { isActive } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found!");
      error.status = 404;
      return next(error);
    }

    // Update only the provided fields
    user.isActive = isActive;

    // Save the updated test
    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  },

  //.......................................Logout..................................//

  async logout(req, res, next) {
    const userId = req.user._id;
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    try {
      await RefreshToken.deleteOne({ userId });
    } catch (error) {
      return next(error);
    }
    try {
      await AccessToken.deleteOne({ token: accessToken });
    } catch (error) {
      return next(error);
    }

    // 2. response
    res.status(200).json({ user: null, auth: false });
  },

  async getSubscriptions(req, res, next) {
    const subscriptions = await Subscription.find();

    return res.status(200).json({ subscriptions });
  },

  async userDetails(req, res, next) {
    const user = await User.findById(req.params.id);

    if (!user) {
      const error = new Error("User not found!");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json({ user });
  },

  async searchUser(req, res, next) {
    const { searchQuery } = req.body;

    const searchFields = [
      "name",
      "email",
      "occupation",
      "maritalStatus",
      "gender",
    ];

    const orQuery = searchFields.map((field) => ({
      [field]: { $regex: searchQuery, $options: "i" }, // Case-insensitive regex search
    }));
    const users = await User.find({
      $or: orQuery,
    });
    return res.status(200).json({ users });
  },

  async userPreferences(req, res, next) {
    const {
      partnerAge,
      partnerMaritalStatus,
      partnerHeight,
      education,
      partnerOccupation,
      partnerMotherTongue,
      partnerAnnualIncome,
      partnerSect,
      partnerCity,
    } = req.body;

    // Construct the query object dynamically based on provided parameters
    let query = {};

    const createCaseInsensitiveRegex = (value) => {
      if (value) {
        return { $regex: value, $options: "i" };
      }
      return undefined;
    };

    if (partnerAge) query["partnerPreference.partnerAge"] = partnerAge;
    if (partnerMaritalStatus)
      query["partnerPreference.partnerMaritalStatus"] =
        createCaseInsensitiveRegex(partnerMaritalStatus);
    if (partnerHeight) query["partnerPreference.partnerHeight"] = partnerHeight;
    if (education)
      query["partnerPreference.education"] =
        createCaseInsensitiveRegex(education);
    if (partnerOccupation)
      query["partnerPreference.partnerOccupation"] =
        createCaseInsensitiveRegex(partnerOccupation);
    if (partnerMotherTongue)
      query["partnerPreference.partnerMotherTongue"] =
        createCaseInsensitiveRegex(partnerMotherTongue);
    if (partnerAnnualIncome)
      query["partnerPreference.partnerAnnualIncome"] = partnerAnnualIncome;
    if (partnerSect)
      query["partnerPreference.partnerSect"] =
        createCaseInsensitiveRegex(partnerSect);
    if (partnerCity)
      query["partnerPreference.partnerCity"] =
        createCaseInsensitiveRegex(partnerCity);

    if (!query) {
      return res.status(400).json({ message: "No preferences provided" });
    }

    try {
      const users = await User.find(query);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async userProfile(req, res, next) {
    const user = req.user;

    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
    } else {
      res.status(200).json({ user, success: true });
    }
  },
};

module.exports = userAuthController;
