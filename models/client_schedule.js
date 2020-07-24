const sequelize = require('../ORM/sequelize')
const { DataTypes } = require('sequelize')
const constant = require('../constants/constants')

const ClientSchedule = sequelize.define(constant.clientScheduleTableName, {
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    start_time: {
        type: DataTypes.DATE
    }
})

module.exports = ClientSchedule