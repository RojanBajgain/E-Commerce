const { showError } = require("../../lib");
const { Category, Brand } = require("../../models");

class ListController {
  categories = async (req, res, next) => {
    try {
      const categories = await Category.find({ status: true });
      res.json(categories);
    } catch (error) {
      showError(error, next);
    }
  };
  categoryById = async (req, res, next) => {
    try {
      const category = await Category.findById({
        status: true,
        _id: req.params.id,
      });
      res.json(category);
    } catch (error) {
      showError(error, next);
    }
  };
  brands = async (req, res, next) => {
    try {
      const brands = await Brand.find({ status: true });
      res.json(brands);
    } catch (error) {
      showError(error, next);
    }
  };
  brandById = async (req, res, next) => {
    try {
      const brand = await Brand.findById({
        status: true,
        _id: req.params.id,
      });
      res.json(brand);
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new ListController();
