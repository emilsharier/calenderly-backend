const sequelize = require('../ORM/sequelize')
const { DataTypes } = require('sequelize')
const constant = require('../constants/constants')
const User = require('./user')

const Client = sequelize.define(constant.clientTableName, {
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

Client.hasMany(User, {
    foreignKey: 'user_id'
})

module.exports = Client