const { showError } = require("../../lib")
const { Category, Brand } = require("../../models")

class ListController{

    categories = async(req, res, next) =>{
        try {
            const categories = await Category.find({status: true}).exec()

            res.json(categories)
        } catch (err) {
            showError(err, next)
        }
    }

    categoryById = async(req, res, next) =>{
        try {
            const category = await Category.findOne({status: true, _id: req.params.id}).exec()

            res.json(category)
        } catch (err) {
            showError(err, next)
        }
    }

    brands = async(req, res, next) =>{
        try {
            const brands = await Brand.find({status: true}).exec()

            res.json(brands)
        } catch (err) {
            showError(err, next)
        }
    }

    brandById = async(req, res, next) =>{
        try {
            const brand = await Brand.findOne({status: true, _id: req.params.id}).exec()

            res.json(brand)
        } catch (err) {
            showError(err, next)
        }
    }
}

module.exports = new ListController