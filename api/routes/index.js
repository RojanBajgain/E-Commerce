const express = require('express')
const AuthRoutes = require('./auth/auth.routes')
const ProfileRoutes = require('./profile/profile.routes')
const CmsRoutes = require('./cms')
const FrontRoutes = require('./front')
const { auth, cmsUser, CustomerOnly } = require('../lib')
const { Profile } = require('../controllers')

const router = express.Router()

router.use('/auth', AuthRoutes)

router.use('/cms', auth, cmsUser, CmsRoutes)

router.use('/profile', auth, ProfileRoutes)

router.use(FrontRoutes)

router.post('/checkout', auth, CustomerOnly, Profile.checkout)

router.get('/image/:filename', (req, res, next) => {
    res.sendFile(`uploads/${req.params.filename}`, {
        root: './'
    })
})


router.use((req, res, next) => {
    res.status(404).json({
        error: 'Resource not found'
    })
})

module.exports = router