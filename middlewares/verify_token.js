const jwt = require('jsonwebtoken')
const config = require('../config/jwt_config')
const sequelize = require('../ORM/sequelize')
const User = require('../models/user')

const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).json({
            message: 'No token provided'
        })
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthorized!'
                })
            }
            req.user_id = decoded.user_id
            next()
        })
    }
}

module.exports = verifyToken