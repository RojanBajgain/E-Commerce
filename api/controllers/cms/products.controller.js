const { showError } = require("../../lib");
const { Product } = require("../../models");
const { unlink } = require('node:fs/promises');

class ProductsController {
    index = async (req, res, next) => {
        try {
            const products = await Product.aggregate([
                { $lookup: { from: 'categories', localField: 'category_id', foreignField: '_id', as: 'category' } },
                { $lookup: { from: 'brands', localField: 'brand_id', foreignField: '_id', as: 'brand' } },
            ]).exec();

            const result = products.map(product => ({
                _id: product._id,
                name: product.name,
                summary: product.summary,
                description: product.description,
                price: product.price,
                discounted_price: product.discounted_price,
                images: product.images,
                category_id: product.category_id,
                brand_id: product.brand_id,
                status: product.status,
                featured: product.featured,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                __v: product.__v,
                category: product.category[0],
                brand: product.brand[0]
            }));

            res.json(result);
        } catch (err) {
            showError(err, next);
        }
    };

    store = async (req, res, next) => {
        try {
            const { name, summary, description, price, discounted_price, category_id, brand_id, featured, status } = req.body;
            const images = req.files.map(img => img.filename);

            await Product.create({ name, summary, description, price, discounted_price, category_id, brand_id, featured, status, images });

            res.json({ success: "Product Added." });
        } catch (err) {
            showError(err, next);
        }
    };

    show = async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            res.json(product);
        } catch (err) {
            showError(err, next);
        }
    };

    update = async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);

            const { name, summary, description, price, discounted_price, category_id, brand_id, featured, status } = req.body;
            const images = [...product.images, ...req.files.map(img => img.filename)];

            await Product.findByIdAndUpdate(req.params.id, { name, summary, description, price, discounted_price, category_id, brand_id, featured, status, images });

            res.json({ success: "Product Updated." });
        } catch (err) {
            showError(err, next);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);

            for (let image of product.images) {
                await unlink(`uploads/${image}`);
            }

            await Product.findByIdAndDelete(req.params.id);

            res.json({ success: "Product Removed." });
        } catch (err) {
            showError(err, next);
        }
    };

    images = async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);

            if (product.images.length > 1) {
                await unlink(`uploads/${req.params.filename}`);

                const images = product.images.filter(image => image != req.params.filename);

                await Product.findByIdAndUpdate(req.params.id, { images });

                res.json({ success: "Product Image Removed." });
            } else {
                next({
                    message: 'At least one image is required in the product.',
                    status: 403,
                });
            }
        } catch (err) {
            showError(err, next);
        }
    };
}

module.exports = new ProductsController;
