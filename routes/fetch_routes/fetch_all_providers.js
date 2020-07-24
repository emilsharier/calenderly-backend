const controller = require('../../controllers/fetch_controller')
const router = require('express').Router()

router.get('/', controller.fetchAllProviders)

module.exports = router