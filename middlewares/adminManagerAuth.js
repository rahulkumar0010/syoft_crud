const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");

const adminManagerAuth = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthenticated());
  }

  const token = authHeader.split(" ")[1];
  try {
    const { _id, role } = await JwtService.verify(token);

    if (role !== "admin" && role !== "manager") {
      return next(
        CustomErrorHandler.unAuthorized(
          "You are not authorized to use this resource."
        )
      );
    }

    const user = { _id, role };
    req.user = user;
    next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorized());
  }
};

module.exports = adminManagerAuth;
