const controller = require(`${__base}/controllers/auth_controller`)
const router = require('express').Router()

router.post('/', controller.signIn)

module.exports = router