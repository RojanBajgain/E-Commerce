const { showError } = require("../../lib")
const { User, Review, Order, OrderDetail } = require("../../models")
const bcrypt = require('bcryptjs')
const { Product } = require("../../models")
const { default: mongoose } = require("mongoose")


class ProfileController {
    detail =  async(req, res, next) => {
        res.json(req.user)
    }
    
    profile = async(req, res, next) => {
        try {
            const { name, phone, address } = req.body

            await User.findByIdAndUpdate(req.uid, {name, phone, address})

            res.json({
                success: "Profile Updated."
            })
        } catch (err) {
            showError(err, next)
        }
    }

    password = async(req, res, next) => {
        try {
            const { old_password, new_password, confirm_password} = req.body

            if (bcrypt.compareSync(old_password, req.user.password)) {
                if (new_password == confirm_password) {
                const hash = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10))

                await User.findByIdAndUpdate(req.uid, {password: hash})

                res.json({
                    success: 'Password Updated..'
                })
                } else {
                    next({
                        message: "Password Not Confirmed.."
                    })
                }
            } else {
                next({
                    message: "Incorrect Old Password.."
                })
            }

        } catch (err) {
            showError(err, next)
        }
    }

    addreview = async(req, res, next) => {
        try {
            const { comment, rating } = req.body

            await Review.create({comment, rating, product_id: req.params.id, user_id: req.uid})

            res.json({
                success: "Thank You For Your Review."
            })
        } catch (err) {
            showError(err, next)
        }
    }

    checkout = async(req, res, next) => {
        try {
            const order = await Order.create({user_id: req.uid})

            for(let item of req.body) {
                const product = await Product.findById(item.product_id)
                const price = product.discounted_price || product.price

                await OrderDetail.create({
                    product_id: item.product_id,
                    order_id: order._id,
                    qty: item.quantity,
                    price,
                    total: price * item.quantity,
                })
            }


            res.json({
                success: "Thank You For Your Order."
            })
        } catch (err) {
            showError(err, next)
        }
    }

    reviews = async(req, res, next) => {
        try {
            const reviews = await Review.aggregate([
                {$match: {user_id: new mongoose.Types.ObjectId(req.uid)}},
                {$lookup: {from: 'products', localField: 'product_id', foreignField: '_id', as:'product'}}
            ]).exec()

            const result = reviews.map(review => {
                return {
                    _id: review._id,
                    user_id: review.user_id,
                    product_id: review.product_id,
                    comment: review.comment,
                    rating: review.rating,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt,
                    product: review.product[0],
                    __v: review.__v,
                }
            })

            res.json(result)
        } catch (err) {
            showError(err, next)
        }
    }

//     orders = (req, res, next) => {
//         Order.find({user_id: req.uid}).exec()
//             .then((orders) => {
//                 for(let order of orders) {
//                     OrderDetail.aggregate([
//                         {$match: {order_id: order._id}},
//                         {$lookup: {from: 'products', localField: 'product_id', foreignField: '_id', as: 'product'}}
//                     ]).exec()
//                         .then((details) => {

//                         })
//                         .catch(err => showError(err, next))
//                 }
//             })
//             .catch(err => showError(err, next))
//     }

// }

orders = async (req, res, next) => {
    try {
        // Fetch all orders for the current user
        const orders = await Order.find({ user_id: req.uid }).exec();

        // Prepare a result array to hold the orders with details
        const result = [];

        // Loop through each order and fetch its details
        for (let order of orders) {
            const orderDetails = await OrderDetail.aggregate([
                { $match: { order_id: order._id } },
                { $lookup: { from: 'products', localField: 'product_id', foreignField: '_id', as: 'product' } }
            ]).exec();

            // Append the order and its details to the result
            result.push({
                order,
                details: orderDetails
            });
        }

        // Return the aggregated result as JSON response
        res.json(result);
    } catch (err) {
        // Handle errors using showError
        showError(err, next);
    }
};
}

module.exports = new ProfileController