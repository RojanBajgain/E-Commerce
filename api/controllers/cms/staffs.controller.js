const { showError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require("bcryptjs")

class StaffsController {
    index = async (req, res, next) => {
        try {
            const staffs = await User.find({type: 'Staff'})

            res.json(staffs)
        } catch (err) {
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { name, email, password, confirm_password, phone, address, status} = req.body

            if(password == confirm_password) {
                const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

            await User.create({name, email, password: hash, phone, address, status, type: 'Staff'})

            res.json({
                success: "Staff Added."
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
            const staff = await User.findById(req.params.id)

            res.json(staff)
        } catch (err) {
            showError(err, next)
        }
    }

    update = async (req, res, next) => {
        try {
            const { name, phone, address, status} = req.body

            await User.findByIdAndUpdate(req.params.id, {name, phone, address, status})

            res.json({
                success: "Staff Upadated."
            })
        } catch (err) {
            showError(err, next)
        }
    }

    destroy = async (req, res, next) => {
        try {
            await User.findByIdAndDelete(req.params.id)

            res.json({
                success: "Staff Removed."
            })
        } catch (err) {
            showError(err, next)
        }
    }
    }


module.exports = new StaffsController