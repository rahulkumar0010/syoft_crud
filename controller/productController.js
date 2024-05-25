const Product = require("../model/Product");
const CustomErrorHandler = require("../services/CustomErrorHandler");
// const CustomErrorHandler = require("../services/CustomErrorHandler");

class productController {
  async create(req, res, next) {
    const { title, description, inventoryCount } = req.value;

    try {
      const product = new Product({
        title,
        description,
        inventoryCount,
      });
      product.save();

      return res.status(201).json({
        status: true,
        message: "Product created successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      const products = await Product.find({});
      return res.json({
        status: true,
        message: "Product fetched successfully",
        products,
      });
    } catch (error) {
      return next(error);
    }
  }
  async update(req, res, next) {
    const { id } = req.params;
    try {
      if (!req.value || Object.keys(req.value).length < 1) {
        return next(
          CustomErrorHandler.validate(
            "Please provide at least one field to update."
          )
        );
      }

      await Product.findByIdAndUpdate(id, { ...req.value });
      return res.json({
        status: true,
        message: "The product was updated successfully.",
      });
    } catch (error) {
      return next(error);
    }
  }
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await Product.findByIdAndRemove(id);
      return res.json({
        status: true,
        message: "The product was deleted successfully.",
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new productController();
