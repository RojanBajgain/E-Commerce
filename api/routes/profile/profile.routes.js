const express = require('express')
const { Profile } = require('../../controllers')
const { CustomerOnly } = require('../../lib')

const router = express.Router()

router.get('/detail', Profile.detail)
router.get('/reviews', CustomerOnly ,Profile.reviews)
router.get('/orders', CustomerOnly ,Profile.orders)

router.route('/edit-profile')
    .put(Profile.profile)
    .patch(Profile.profile)

router.route('/change-password')
    .put(Profile.password)
    .patch(Profile.password)

module.exports = router