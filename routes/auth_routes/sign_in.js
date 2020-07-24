const controller = require(`../../controllers/controllers`)

const router = require('express').Router()

router.post('/', controller.AuthController.signIn)

module.exports = router