const sequelize = require('./sequelize')
require('../models/user')
require('../models/client_schedule')
require('../models/provider_occupied_time')
require('../models/schedule_info')

const init = async () => {
    await sequelize.sync({ logging: false, alter: true })
}

module.exports = init