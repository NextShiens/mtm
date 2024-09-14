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
const admin = require('firebase-admin');
const serviceAccount = require('../vaishakhi-matrimony-firebase-adminsdk-mjr6h-33d857fb90.json'); // Replace with the path to your Firebase service account key file

if (!admin.apps.length) {
  const serviceAccount = require('../../vaishakhi-matrimony-firebase-adminsdk-mjr6h-33d857fb90.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // If you're using other Firebase services, include their configs here
  });
}
const auth = admin.auth();
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
      email: Joi.string().required(),
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
    const { password, newPassword, userId } = req.body;
    const userChangePasswordSchema = Joi.object({
      password: Joi.string().required(),
      newPassword: Joi.string().required(),
      userId: Joi.string().required(),
    });
    const { error } = userChangePasswordSchema.validate(req.body);

    if (error) {
      return next(error);
    }
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
      const userRecord = await auth.getUserByEmail(email);
      if(!userRecord){
        return res.status(404).json({ message: "Email not exsit!" });
      }
      const uid = userRecord.uid;
      
      await auth.updateUser(uid, { password: password });
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
        dateOfBirth: Joi.string().required(),
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
        // partnerPreference: Joi.object({
        //   partnerAge: Joi.string().optional(),
        //   partnerMaritalStatus: Joi.string().optional(),
        //   partnerHeight: Joi.string().optional(),
        //   education: Joi.string().optional(),
        //   partnerOccupation: Joi.string().optional(),
        //   partnerMotherTongue: Joi.string().optional(),
        //   partnerAnnualIncome: Joi.string().optional(),
        //   partnerSect: Joi.string().optional(),
        //   partnerCity: Joi.string().optional()
        // }),
        ageFrom: Joi.string().optional(),
        ageTo: Joi.string().optional(),
        heightFrom: Joi.string().optional(),
        heightTo: Joi.string().optional(),
        lookingFor: Joi.string().required(),
        physicalStatus: Joi.string().required(),
        food: Joi.string().required(),
        smoking: Joi.string().required(),
        drinking: Joi.string().required(),
        familyType: Joi.string().required(),
        familyStatus: Joi.string().required(),
        familyValue: Joi.string().required(),
        fathersOccupation: Joi.string().required(),
        horoscopeDetails: Joi.object({
          dosh: Joi.string().required(),
          // moonsign: Joi.string().allow(''),
          star: Joi.string().required(),
          birthTime: Joi.string().required(),
          birthPlace: Joi.string().required(),
          religion: Joi.string().required(),
          caste: Joi.string().required(),
          motherTongue: Joi.string().required(),
          manglik: Joi.string().required(),
        }),
        FamilyDetails: Joi.object({
          numOfBrothers: Joi.string().required(),
          numOfMarriedBrothers: Joi.string().required(),
          numOfSisters: Joi.string().required(),
          numOfMarriedSisters: Joi.string().required(),
          country: Joi.string().required(),
          state: Joi.string().required(),
          city: Joi.string().required(),
        }),
        Education: Joi.object({
          education: Joi.string().required(),
          occupation: Joi.string().required(),
          income: Joi.string().required(),
        }),
        partnerExpectation: Joi.string().required(),
      });

      const { error } = userSchema.validate(req.body);

      if (error) {
        return next(error);
      }
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
          name: Joi.string(),
          email: Joi.string(),
          phone: Joi.string(),
          gender: Joi.string().valid("male", "female"),
          dateOfBirth: Joi.string(),
          age: Joi.string(),
          height: Joi.string(),
          motherTongue: Joi.string(),
          caste: Joi.string(),
          religion: Joi.string(),
          sect: Joi.string(),
          city: Joi.string(),
          highestDegree: Joi.string(),
          occupation: Joi.string(),
          employedIn: Joi.string(),
          annualIncome: Joi.string(),
          workLocation: Joi.string(),
          maritalStatus: Joi.string(),
          fcmToken: Joi.string(),
          userImages: Joi.array().items(Joi.string()),
          profileCompleted: Joi.boolean(),
          isActive: Joi.boolean(),
          isPaid: Joi.boolean(),
          isFeatured: Joi.boolean(),
          sentInterests: Joi.array().items(Joi.string()),
          receivedInterests: Joi.array().items(Joi.string()),
          friends: Joi.array().items(Joi.string()),
          ageFrom: Joi.string(),
          ageTo: Joi.string(),
          heightFrom: Joi.string(),
          heightTo: Joi.string(),
          lookingFor: Joi.string(),
          physicalStatus: Joi.string(),
          food: Joi.string(),
          smoking: Joi.string(),
          drinking: Joi.string(),
          familyType: Joi.string(),
          familyStatus: Joi.string(),
          familyValue: Joi.string(),
          fathersOccupation: Joi.string(),
          dosh: Joi.string(),
          star: Joi.string(),
          birthTime: Joi.string(),
          birthPlace: Joi.string(),
          manglik: Joi.string(),
          numOfBrothers: Joi.string(),
          numOfMarriedBrothers: Joi.string(),
          numOfSisters: Joi.string(),
          numOfMarriedSisters: Joi.string(),
          country: Joi.string(),
          state: Joi.string(),
          partnerExpectation: Joi.string(),
          education: Joi.string(),
          occupation: Joi.string(),
          income: Joi.string(),
      });
  
      const { error } = userSchema.validate(req.body);
  
      if (error) {
          return next(error);
      }
  
      const {
          phone, name, dateOfBirth, userImages, email, gender, height, city, motherTongue,drinking, partnerExpectation, highestDegree, occupation, maritalStatus, employedIn, annualIncome, numOfSisters, numOfMarriedSisters, numOfBrothers, numOfMarriedBrothers, country, state, education, income, fathersOccupation, familyValue, familyStatus, familyType, smoking, food, physicalStatus, lookingFor, heightFrom, heightTo, ageFrom, ageTo, dosh, star, birthTime, birthPlace, religion, caste, sect, manglik,
      } = req.body;

      console.log(req.body.userImages,"jdsjshakjhdafkjhaghahggdg");
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
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (userImages) user.userImages = userImages;
      if (email) user.email = email;
      if (gender) user.gender = gender;
      if (height) user.height = height;
      if (city) user.city = city;
      if (motherTongue) user.motherTongue = motherTongue;
      if (partnerExpectation) user.partnerExpectation = partnerExpectation;
      if (highestDegree) user.highestDegree = highestDegree;
      if (occupation) user.occupation = occupation;
      if (maritalStatus) user.maritalStatus = maritalStatus;
      if (employedIn) user.employedIn = employedIn;
      if (annualIncome) user.annualIncome = annualIncome;
      if (ageFrom) user.ageFrom = ageFrom;
      if (ageTo) user.ageTo = ageTo;
      if (heightFrom) user.heightFrom = heightFrom;
      if (heightTo) user.heightTo = heightTo;
      if (lookingFor) user.lookingFor = lookingFor;
      if (physicalStatus) user.physicalStatus = physicalStatus;
      if (food) user.food = food;
      if (smoking) user.smoking = smoking;
      if (drinking) user.drinking = drinking;
      if (familyType) user.familyType = familyType;
      if (familyStatus) user.familyStatus = familyStatus;
      if (familyValue) user.familyValue = familyValue;
      if (fathersOccupation) user.fathersOccupation = fathersOccupation;
      if (sect) user.sect = sect;
  
      // Update nested fields
      if (dosh) user.horoscopeDetails.dosh = dosh;
      if (star) user.horoscopeDetails.star = star;
      if (birthTime) user.horoscopeDetails.birthTime = birthTime;
      if (birthPlace) user.horoscopeDetails.birthPlace = birthPlace;
      if (religion) user.horoscopeDetails.religion = religion;
      if (caste) user.horoscopeDetails.caste = caste;
      if (manglik) user.horoscopeDetails.manglik = manglik;
  
      if (numOfBrothers) user.FamilyDetails.numOfBrothers = numOfBrothers;
      if (numOfMarriedBrothers) user.FamilyDetails.numOfMarriedBrothers = numOfMarriedBrothers;
      if (numOfSisters) user.FamilyDetails.numOfSisters = numOfSisters;
      if (numOfMarriedSisters) user.FamilyDetails.numOfMarriedSisters = numOfMarriedSisters;
      if (country) user.FamilyDetails.country = country;
      if (state) user.FamilyDetails.state = state;
      if (city) user.FamilyDetails.city = city;
  
      if (education) user.Education.education = education;
      if (occupation) user.Education.occupation = occupation;
      if (income) user.Education.income = income;
  
      // Save the updated user
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

    const user = await User.findByIdAndUpdate(userId);

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
  async searchUsers(req, res, next) {
    try {
      const { query } = req.query; // Get the search query from the request
      const regex = new RegExp(query, "i"); // Create a regex for case-insensitive search

      // Find users that match the query in name, age, occupation, email, or location
      const matchedUsers = await User.find({
        $or: [
          { name: { $regex: regex } },
          { age: { $regex: regex } },
          { occupation: { $regex: regex } },
          { email: { $regex: regex } },
          { city: { $regex: regex } }, // Updated to 'city'
          { religion: { $regex: regex } },
          { caste: { $regex: regex } },
          { workLocation: { $regex: regex } },
        ],
      });

      // Send the matched users as a response
      res.status(200).json({
        success: true,
        data: matchedUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  async currentUser(req, res, next) {
    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
    } else {
      res.status(200).json({ user, success: true });
    }
  },
};

module.exports = userAuthController;
