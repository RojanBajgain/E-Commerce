const { Schema, model } = require('mongoose')

const Review = model('Review', new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        'ref': 'products'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        'ref': 'users'
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}))

module.exports = Review