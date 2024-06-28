const JWTService = require("../services/JWTService");
const User = require("../models/user");
// const Vendor = require("../models/vendor/vendor");
const jwt = require("jsonwebtoken");

const AccessToken = require("../models/accessToken");

const auth =async (req, res, next) => {
  try {
    // 1. refresh, access token validation
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    const ifTokenExists = await AccessToken.find({ token: accessToken });
    if (ifTokenExists == "") {
      const error = {
        status: 401,
        message: "Unauthorized",
      };
      return next(error);
    }

    if (!accessToken) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }
    // console.log(accessToken)

    let _id;

    try {
      _id = JWTService.verifyAccessToken(accessToken)._id;
    } catch (error) {
      return next(error);
    }
    let user;
    if (req.originalUrl.includes("/user")) {
      try {
        user = await User.findOne({ _id: _id });
      } catch (error) {
        return next(error);
      }

      req.user = user;

      next();
      return;
    }
  } catch (error) {
    return next(error);
  }
};

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    if (!token) {
      throw new Error("Login to Access the resource");
    } else {
      jwt.verify(token, "ksdjfskdur", async (err, userInfo) => {
        if (err) {
          throw new Error("Login to Access the resource");
        } else {
          req.user = await User.findById(userInfo.id);

          next();
        }
      });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { isAuthenticated, auth };
