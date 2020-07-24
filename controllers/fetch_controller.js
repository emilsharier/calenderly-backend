const { Op } = require('sequelize')

const models = require('../models/models')

const fetchAllProviders = async (req, res) => {
    try {
        let data = await models.Provider.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ['name', 'phone', 'email']
                }
            ],
            logging: false
        })
        // console.log(data)
        return res.status(200).json({
            message: 'OK',
            data: data
        })
    } catch (ex) {
        console.error(ex)
        throw ex
    }
}

const searchForProviders = async (req, res) => {
    try {
        let search = req.body.search
        let result = await models.Provider.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ['name', 'phone', 'email'],
                    where: {
                        name: {
                            [Op.like]: `%${search}%`
                        }
                    }
                }
            ],
            logging: false
        })
        return res.status(200).json({
            message: 'OK',
            data: result
        })
    } catch (ex) {
        console.log(ex)
        return res.sendStatus(404)
    }
}

module.exports = { fetchAllProviders, searchForProviders }