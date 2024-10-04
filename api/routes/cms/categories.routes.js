const express = require('express')
const { Cms } = require('../../controllers')

const router = express.Router()

router.route('/')
    .get(Cms.Categories.index)
    .post(Cms.Categories.store)

router.route('/:id')
    .get(Cms.Categories.show)
    .put(Cms.Categories.update)
    .patch( Cms.Categories.update)
    .delete(Cms.Categories.destroy)

module.exports = router