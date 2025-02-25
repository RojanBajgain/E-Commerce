const { default: mongoose } = require('mongoose');
const { showError } = require('../../lib');
const { Product, Review } = require('../../models');

class ProductController {
    latest = async (req, res, next) => {
        try {
            const products = await Product.find({ status: true }).sort({ createdAt: 'desc' }).exec();
            res.json(products);
        } catch (err) {
            showError(err, next);
        }
    }

    featured = async (req, res, next) => {
        try {
            const products = await Product.find({ status: true, featured: true }).exec();
            res.json(products);
        } catch (err) {
            showError(err, next);
        }
    }

    top = async (req, res, next) => {
        try {
            const products = await Product.aggregate([
                { $match: { status: true } },
                { $lookup: { from: 'orderdetails', localField: '_id', foreignField: 'product_id', as: 'order_count' } },
                { $addFields: { order_count: { $size: '$order_count' } } }
            ]).sort({ order_count: 'desc' }).exec();
            
            res.json(products);
        } catch (err) {
            showError(err, next);
        }
    }

    byId = async (req, res, next) => {
        try {
            const products = await Product.aggregate([
                { $match: { status: true, _id: new mongoose.Types.ObjectId(req.params.id) } },
                { $lookup: { from: 'brands', localField: 'brand_id', foreignField: '_id', as: 'brand' } },
            ]).sort({order_count: 'desc'}).exec()

            const result = []

            for(let product of products) {
                const reviews = await Review.aggregate([
                    { $match: { product_id: new mongoose.Types.ObjectId(req.params.id) } },
                    { $lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'user' } },
                ]).exec()

                const list = reviews.map(review => {
                    return {
                        _id: review._id,
                        user_id: review.user_id,
                        product_id: review.product_id,
                        comment: review.comment,
                        rating: review.rating,
                        createdAt: review.createdAt,
                        updatedAt: review.updatedAt,
                        user: review.user[0],
                        __v: review.__v,
                    }
                })

                result.push({
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
                        brand: product.brand[0],
                        reviews: list,
                })
            }

            res.json(result[0]);
        } catch (err) {
            showError(err, next);
        }
    }

    byCategoryId = async (req, res, next) => {
        try {
            const products = await Product.find({ status: true, category_id: req.params.id }).exec();
            res.json(products);
        } catch (err) {
            showError(err, next);
        }
    }

    byBrandId = async (req, res, next) => {
        try {
            const products = await Product.find({ status: true, brand_id: req.params.id }).exec();
            res.json(products);
        } catch (err) {
            showError(err, next);
        }
    }

    similar = async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            const products = await Product.find({
                status: true,
                category_id: product.category_id,
                _id: { $ne: req.params.id }
            }).exec();

            res.json(products);
        } catch (err) {
            showError(err, next);
        }
    }

    search = async (req, res, next) => {
        try {
            const products = await Product.find({ status: true, name: {$regex: req.query.term, $options: 'i'} }).exec();
            res.json(products);
        } catch (err) {
            showError(err, next);
        }
    }
}

module.exports = new ProductController();
