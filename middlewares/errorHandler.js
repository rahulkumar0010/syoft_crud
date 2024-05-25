const { ValidationError } = require("joi");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const { DEBUG_MODE } = require("../config");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    status: false,
    message: "Internal Server error",
    ...(DEBUG_MODE === true && { originalError: err.message }),
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      status: false,
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      status: false,
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

module.exports = errorHandler;
