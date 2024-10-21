const { showError } = require("../../lib");
const { Product } = require("../../models");
const { unlink } = require("node:fs/promises");

class ProductController {
  index = async (req, res, next) => {
    try {
      const products = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brand_id",
            foreignField: "_id",
            as: "brand",
          },
        },
      ]);
      const result = products.map(product => {
        return {
          _id: product._id,
          name: product.name,
          summary: product.summary,
          description: product.description,
          price: product.price,
          discounted_price: product.discounted_price,
          category_id: product.category_id,
          brand_id: product.brand_id,
          status: product.status,
          featured: product.featured,
          images: product.images,
          category: product.category[0],
          brand: product.brand[0],
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        };
      });
      res.json(result);
    } catch (error) {
      showError(error, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const {
        name,
        summary,
        description,
        price,
        discounted_price,
        category_id,
        brand_id,
        status,
        featured,
      } = req.body;
      const images = req.files.map(img => img.filename);
      await Product.create({
        name,
        summary,
        description,
        price,
        discounted_price,
        category_id,
        brand_id,
        images,
        status,
        featured,
      });
      res.json({
        success: `Product created`,
      });
    } catch (error) {
      showError(error, next);
    }
  };

  show = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
    try {
    } catch (error) {
      showError(error, next);
    }
  };

  update = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    try {
      const {
        name,
        summary,
        description,
        price,
        discounted_price,
        category_id,
        brand_id,
        status,
        featured,
      } = req.body;
      const images = [...product.images, ...req.files.map(img => img.filename)];
      await Product.findByIdAndUpdate(req.params.id, {
        name,
        summary,
        description,
        images,
        price,
        discounted_price,
        category_id,
        brand_id,
        status,
        featured,
      });
      res.json({
        success: `Product Updated`,
      });
    } catch (error) {
      showError(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      for (let img of product.images) {
        await unlink(`uploads/${img}`);
      }
      await Product.findByIdAndDelete(req.params.id);
      res.json({
        success: "Product removed",
      });
    } catch (error) {
      showError(error, next);
    }
  };
  images = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product.images.length > 1) {
        await unlink(`uploads/${req.params.filename}`);
        const images = product.images.filter(img => img != req.params.filename);
        await Product.findByIdAndUpdate(req.params.id, { images });
        res.json({
          success: `An image of a product is removed`,
        });
      } else {
        next({
          status: 403,
          message: "At least one image is required",
        });
      }
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new ProductController();
