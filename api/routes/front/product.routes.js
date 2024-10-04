const express = require('express')
const { Front, Profile } = require('../../controllers')
const { auth, CustomerOnly } = require('../../lib')

const router = express.Router()

router.get('/latest', Front.Product.latest)
router.get('/featured', Front.Product.featured)
router.get('/top-selling', Front.Product.top)
router.get('/:id', Front.Product.byId)
router.get('/:id/similar', Front.Product.similar)
router.post('/:id/review', auth, CustomerOnly, Profile.addreview)

module.exports = router