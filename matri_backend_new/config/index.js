const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ||"secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ||"secret";
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

module.exports = {
  PORT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  BACKEND_SERVER_PATH,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
};
