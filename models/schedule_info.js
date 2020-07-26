const sequelize = require('../ORM/sequelize')
const { DataTypes } = require('sequelize')
const constant = require('../constants/constants')
const User = require('./user')

const ScheduleInfo = sequelize.define(constant.scheduleInfoTableName, {
    schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    client_id: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    provider_id: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    }
})

ScheduleInfo.hasMany(User, {
    // foreignKey: 'user_id'
})

module.exports = ScheduleInfo