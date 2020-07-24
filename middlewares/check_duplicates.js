const User = require('../models/user')

const checkForDuplicateEntry = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        },
        logging: false
    }).then(user => {
        if(user) {
            return res.status(409).json({
                message: 'Failed! Email id is already in use'
            })
        } else {
            next()
        }
    })
}

module.exports = checkForDuplicateEntry