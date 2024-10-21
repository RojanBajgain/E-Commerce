const { showError } = require("../../lib");
const { Category } = require("../../models");

class CategoryController {
  index = async (req, res, next) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      showError(error, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const { name, status } = req.body;
      await Category.create({
        name,
        status,
      });
      res.json({
        success: `Category created`,
      });
    } catch (error) {
      showError(error, next);
    }
  };

  show = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    res.json(category);
    try {
    } catch (error) {
      showError(error, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name, status } = req.body;
      await Category.findByIdAndUpdate(req.params.id, {
        name,
        status,
      });
      res.json({
        success: `Category Updated`,
      });
    } catch (error) {
      showError(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({
        success: "Category removed",
      });
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new CategoryController();
