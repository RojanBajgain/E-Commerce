const { Schema, model } = require('mongoose')

const Order = model('Order', new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        'ref': 'users'
    },
    status: {
        type: String,
        enum: ['Processing', 'Confirmed', 'Shipping', 'Delivered'],
        default: 'Processing'
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
}))

module.exports = Order