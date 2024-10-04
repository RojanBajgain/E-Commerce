const express = require('express')
const { Cms } = require('../../controllers')
const { fileUpload } = require('../../lib')

const router = express.Router()

// Product routes
router.route('/')
    .get(Cms.Products.index)
    .post(fileUpload(['image/jpeg', 'image/png', 'image/gif', 'image/jpg']).array('images'), Cms.Products.store) // Upload multiple images and store product

router.route('/:id')
    .get(Cms.Products.show)
    .put(fileUpload(['image/jpeg', 'image/png', 'image/gif', 'image/jpg']).array('images'), Cms.Products.update)
    .patch(fileUpload(['image/jpeg', 'image/png', 'image/gif', 'image/jpg']).array('images'), Cms.Products.update)
    .delete(Cms.Products.destroy)

router.delete('/:id/image/:filename', Cms.Products.images)

module.exports = router