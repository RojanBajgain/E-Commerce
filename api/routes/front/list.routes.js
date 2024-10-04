const express = require('express')
const { Front } = require('../../controllers')

const router = express.Router()

router.get('/category', Front.List.categories)
router.get('/category/:id', Front.List.categoryById)
router.get('/category/:id/products', Front.Product.byCategoryId)

router.get('/brand', Front.List.brands)
router.get('/brand/:id', Front.List.brandById)
router.get('/brand/:id/products', Front.Product.byBrandId)

router.get('/search', Front.Product.search)

module.exports = router