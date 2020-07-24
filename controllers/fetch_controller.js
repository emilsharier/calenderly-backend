const Client = require('../models/client')
const Provider = require('../models/provider')
const User = require('../models/user')

const fetchAllProviders = async (req, res) => {
    try {
        let data = await Provider.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'phone', 'email']
                }
            ],
            logging: false
        })
        console.log(data)
        return res.status(200).json({
            message: 'OK',
            data: data
        })
    } catch (ex) {
        console.error(ex)
        throw ex
    }
}

module.exports = { fetchAllProviders }