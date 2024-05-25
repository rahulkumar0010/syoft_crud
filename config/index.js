require("dotenv").config();

var PORT = process.env.PORT;
var DEBUG_MODE = process.env.DEBUG_MODE;
var MONGO_URL = process.env.MONGO_URL;
var JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT: PORT,
  DEBUG_MODE: DEBUG_MODE,
  MONGO_URL: MONGO_URL,
  JWT_SECRET: JWT_SECRET,
};
