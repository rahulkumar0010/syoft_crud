const bcrypt = require("bcrypt");
const User = require("../model/User");
const JwtService = require("../services/JwtService");
const CustomErrorHandler = require("../services/CustomErrorHandler");

class userController {
  async register(req, res, next) {
    const { username, email, password, role } = req.value;

    try {
      const exists = await User.findOne({ email });
      if (exists)
        return next(
          CustomErrorHandler.alreadyExist(
            "User already exists with this email!"
          )
        );
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const user = new User({
        username,
        email,
        password: hashPassword,
        role,
      });
      user.save();

      res.json({
        status: true,
        message: "Register successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const exists = await User.findOne({ email });

      if (!exists) return next(CustomErrorHandler.notFound("User not found!"));
      //  Problem in conparing password
      const match = await bcrypt.compare(password, exists.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      const accessToken = await JwtService.sign(
        { id: exists._id, role: exists.role },
        "4h"
      );

      // Exclude the password field from the user object
      const user = exists.toObject();
      delete user.password;

      res.json({
        status: true,
        message: "Login successfully",
        data: { user: user, token: accessToken },
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new userController();
