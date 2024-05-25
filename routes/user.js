const routes = require("express").Router();
const Controller = require("../controller/authController");
const validateRequest = require("../middlewares/validateRequest");
const { registerSchema, loginSchema } = require("../utils/validationSchemas");

routes.post("/register", validateRequest(registerSchema), Controller.register);
routes.post("/login", validateRequest(loginSchema), Controller.login);

module.exports = routes;
