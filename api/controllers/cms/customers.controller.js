const { showError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require("bcryptjs")

class CustomersController {
    index = async (req, res, next) => {
        try {
            const customers = await User.find({type: 'Customer'}).exec()

            res.json(customers)
        } catch (err) {
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { name, email, password, confirm_password, phone, address} = req.body

            if(password == confirm_password) {
                const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

            await User.create({name, email, password: hash, phone, address, type: 'Customer'})

            res.json({
                success: "Customer Added."
            })
        } else {
            next({
                message: "Password not confirmed.",
                status: 400,
            })
        }
        } catch (err) {
            showError(err, next)
        }
    }

    show = async (req, res, next) => {
        try {
            const customer = await User.findById(req.params.id)

            res.json(customer)
        } catch (err) {
            showError(err, next)
        }
    }

    update = async (req, res, next) => {
        try {
            const { name, phone, address} = req.body

            await User.findByIdAndUpdate(req.params.id, {name, phone, address})

            res.json({
                success: "Customer Upadated."
            })
        } catch (err) {
            showError(err, next)
        }
    }

    destroy = async (req, res, next) => {
        try {
            await User.findByIdAndDelete(req.params.id)

            res.json({
                success: "Customer Removed."
            })
        } catch (err) {
            showError(err, next)
        }
    }
    }


module.exports = new CustomersController