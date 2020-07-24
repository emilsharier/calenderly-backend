const sequelize = require('../ORM/sequelize')
const { DataTypes } = require('sequelize')
const constant = require('../constants/constants')

const Client = sequelize.define(constant.clientTableName, {
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Client