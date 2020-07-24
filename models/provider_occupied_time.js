const sequelize = require('../ORM/sequelize')
const { DataTypes } = require('sequelize')
const constant = require('../constants/constants')
const User = require('./user')

const ProviderOccupiedTime = sequelize.define(constant.providerOccupiedTimeTableName, {
    provider_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    occupied_time_start: {
        type: DataTypes.TIME,
        allowNull: false
    },
    occupied_time_end: {
        type: DataTypes.TIME,
        allowNull: false
    }
})

ProviderOccupiedTime.hasMany(User, {
    foreignKey: 'user_id'
})

module.exports = ProviderOccupiedTime