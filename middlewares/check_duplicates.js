const models = require('../models/models')

const checkForDuplicateEntry = (req, res, next) => {
    models.User.findOne({
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