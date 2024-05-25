const Joi = require("joi");

const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("admin", "manager", "staff").required(),
});
const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const productSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  inventoryCount: Joi.number().required(),
});
const productUpdateSchema = Joi.object().keys({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  inventoryCount: Joi.number().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  productUpdateSchema,
};
