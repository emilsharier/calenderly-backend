const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/jwt_config')
// const mail = require('../controllers/mail_controller')

const models = require('../models/models')

/* User sign up using email and password
Also hashing the password before storage */
const signUp = async (req, res) => {
    try {
        const pass = await bcrypt.hash(req.body.password, 8)
        let user = await models.User.create({
            email: req.body.email,
            password: pass,
            user_type: req.body.type,
            name: req.body.name,
            phone: req.body.phone,
        })
        if (user) {
            console.log(user)
            console.log(user.user_id)
            if (req.body.type == 0)
                await models.Client.create({
                    user_id: user.user_id
                })
            else
                await models.Provider.create({
                    user_id: user.user_id
                })
            return res.status(201).json({
                message: 'Registration complete!'
            })
        } else {
            return res.status(403).json({
                message: 'Uh! oh. Something went wrong'
            })
        }
    } catch (ex) {
        console.log('*****ERROR*******')
        console.log(ex)
        return res.status(404).json({
            message: 'Uh! oh. Something went wrong'
        })
    }
}

/* User sign in using email and password 
Using bcrypt to compare passwords */
const signIn = (req, res) => {
    models.User.findOne({
        where: {
            email: req.body.email
        },
        logging: false
    }).then(user => {
        if (user) {
            let passwordStatus = bcrypt.compareSync(
                req.body.password, user.password
            )
            if (!passwordStatus) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid password'
                })
            } else {
                let token = jwt.sign({
                    user_id: user.user_id,
                    email: user.email
                }, config.secret, {
                    expiresIn: '90d'
                })
                return res.status(200).json({
                    accessToken: token,
                    id: user.user_id
                })
            }
        } else {
            return res.status(403).json({
                message: 'No such user found'
            })
        }
    })
}

const resetPassword = async (req, res) => {
    // let password = generatePassword(10)

    // let email = req.headers['user-email']
    // let user = req.user
    // try {
    //     let result = user.update({
    //         password: password
    //     })
    //     if (result) {
    //         mail(email, password)
    //     }
    // } catch (ex) {
    //     // TO DO
    // }
}

// Not implemented yet
const generatePassword = (length) => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

module.exports = { signUp, signIn, resetPassword }