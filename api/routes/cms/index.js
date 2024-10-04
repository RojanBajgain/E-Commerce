const express = require('express')
const staffsRoutes = require('./staffs.routes')
const customersRoutes = require('./customers.routes')
const categoriesRoutes = require('./categories.routes')
const brandsRoutes = require('./brands.routes')
const productsRoutes = require('./products.routes')
const { adminOnly } = require('../../lib')

const router = express.Router()

router.use('/staffs', adminOnly, staffsRoutes)

router.use('/customers', customersRoutes)

router.use('/categories', categoriesRoutes)

router.use('/brands', brandsRoutes)

router.use('/products', productsRoutes)

module.exports = router