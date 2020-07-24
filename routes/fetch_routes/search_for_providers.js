const controller = require('../../controllers/controllers')
const router = require('express').Router()
const middleware = require('../../middlewares/middlewares')

router.post('/', [middleware.verifyToken], controller.FetchController.searchForProviders)

module.exports = router