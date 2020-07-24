const middlewares = require(`../../middlewares/middlewares`)
const controller = require(`../../controllers/controllers`)

const router = require('express').Router()

router.post('/', [middlewares.checkForDuplicates], controller.AuthController.signUp)

module.exports = router