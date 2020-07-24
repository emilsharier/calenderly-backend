const router = require('express').Router()
const middlewares = require('../../middlewares/middlewares')
const controllers = require('../../controllers/controllers')

router.post('/', [middlewares.verifyToken], controllers.ProviderController.changeProviderOccupiedTime)

module.exports = router