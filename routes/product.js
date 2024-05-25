const routes = require("express").Router();
const Controller = require("../controller/productController");
const validateRequest = require("../middlewares/validateRequest");
const adminAuth = require("../middlewares/adminAuth");
const adminManagerAuth = require("../middlewares/adminManagerAuth");
const {
  productSchema,
  productUpdateSchema,
} = require("../utils/validationSchemas");

routes.post(
  "/create",
  adminAuth,
  validateRequest(productSchema),
  Controller.create
);

routes.get("/get-all", adminManagerAuth, Controller.getAll);
routes.patch(
  "/update/:id",
  adminManagerAuth,
  validateRequest(productUpdateSchema),
  Controller.update
);

routes.delete("/delete/:id", adminAuth, Controller.delete);

module.exports = routes;
