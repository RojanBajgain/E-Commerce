const { Schema, model } = require('mongoose')

const User = model('User', new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 30,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        enum: ['Customer', 'Staff', 'Admin'],
        default: 'Customer',
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}))

module.exports = User