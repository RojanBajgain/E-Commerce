const { showError } = require("../../lib");
const { Brand } = require("../../models");

class BrandController {
  index = async (req, res, next) => {
    try {
      const brands = await Brand.find();
      res.json(brands);
    } catch (error) {
      showError(error, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const { name, status } = req.body;
      await Brand.create({
        name,
        status,
      });
      res.json({
        success: `Brand created`,
      });
    } catch (error) {
      showError(error, next);
    }
  };

  show = async (req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    res.json(brand);
    try {
    } catch (error) {
      showError(error, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name, status } = req.body;
      await Brand.findByIdAndUpdate(req.params.id, {
        name,
        status,
      });
      res.json({
        success: `Brand Updated`,
      });
    } catch (error) {
      showError(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      await Brand.findByIdAndDelete(req.params.id);
      res.json({
        success: "Brand removed",
      });
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new BrandController();
