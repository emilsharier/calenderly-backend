const checkForDuplicates = require(`${__base}/middlewares/check_duplicates`)
const controller = require(`${__base}/controllers/auth_controller`)
const router = require('express').Router()

router.post('/', [checkForDuplicates], controller.signUp)

module.exports = router