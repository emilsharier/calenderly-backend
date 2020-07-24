const sequelize = require('../ORM/sequelize')
const { DataTypes } = require('sequelize')
const constant = require('../constants/constants')
const User = require('./user')

const Provider = sequelize.define(constant.providerTableName, {
    provider_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

Provider.hasMany(User, {
    foreignKey: 'user_id'
})

module.exports = Provider