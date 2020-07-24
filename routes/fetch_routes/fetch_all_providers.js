const controller = require('../../controllers/controllers')
const router = require('express').Router()
const middlewares = require('../../middlewares/middlewares')

router.post('/', [middlewares.verifyToken], controller.FetchController.fetchAllProviders)

module.exports = router