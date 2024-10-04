const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const multer = require('multer')


const debug = () => process.env.DEBUG == 'true'

const showError = (error, next) => {
    if(debug) {
        console.error(error)
    }
    next({
        message: "Problem While executing request.",
        status: 400,
    })
}

const auth = async (req, res, next) => {
    if ('authorization' in req.headers) {
        const token = req.headers.authorization.split(' ').pop()

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const uid = decoded.id
            
            const user = await User.findById(uid)
            if (user) {
                req.uid = uid
                req.user = user

                next()
            } else {
                next({
                    message: "Invalid Token.",
                    status: 401,
                })
            }
        } catch (err) {
            next({
                message: "Invalid Token.",
                status: 401,
            })
        }
    } else {
        next({
            message: "Token Missing.",
            status: 401,
        })
    }
}

const cmsUser = async (req, res, next) => {
    if (req.user.type == 'Customer') {
        next({
            message: "Access Denied.",
            status: 403,
        })
    } else {
        next()
    }
}

const adminOnly = async (req, res, next) => {
    if (req.user.type != 'Admin') {
        next({
            message: "Access Denied.",
            status: 403,
        })
    } else {
        next()
    }
}

const CustomerOnly = async (req, res, next) => {
    if (req.user.type != 'Customer') {
        next({
            message: "Access Denied.",
            status: 403,
        })
    } else {
        next()
    }
}

const fileUpload = (mimeTypes = []) => multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => callback(null, 'uploads'),
        filename: (req, file, callback) => {
            const ext = file.originalname.split('.').pop()
            const filename = Date.now() + `${Math.floor(Math.random() * 100) + 1}` + `.${ext}`
            callback(null, filename)
        },
    }),
    fileFilter: (req, file, callback) => {
        if(mimeTypes.length > 0) {
            if(mimeTypes.includes(file.mimetype)) {
                callback(null, true)
            } else {
                callback({message: 'File type not supported.'}, false)
            }
        } else {
            callback(null, true)
        }
    }
})

module.exports = { showError, debug, auth, cmsUser, adminOnly, CustomerOnly, fileUpload }