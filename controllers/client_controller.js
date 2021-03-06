const models = require('../models/models')
const { Op } = require('sequelize')

const bookSchedule = async (req, res) => {
    const date = req.body.date
    // console.log(date)
    const description = req.body.description.trim()
    const userId = req.body.user_id
    const providerId = req.body.provider_id

    const startTime = req.body.start_time
    const endTime = req.body.end_time

    const parsedStartTime = Date.parse(date + ' ' + req.body.start_time)

    try {
        let [result1, result2] = await Promise.all([
            models.ProviderOccupiedTime.findAll({
                where: {
                    date: {
                        [Op.eq]: date
                    },
                    provider_id: {
                        [Op.eq]: providerId
                    }
                },
                logging: false
            }), models.ScheduleInfo.findAll({
                where: {
                    client_id: {
                        [Op.eq]: userId
                    }
                },
                logging: false
            })
        ])
        let flag = true
        let length = result2.length
        for (let i = 0; i < length; i++) {
            if (startTime == result2[i].start_time) {
                flag = false
                break
            }
        }
        let occupiedStartTime, occupiedEndTime
        let bool = false
        console.log(result1)
        if (result1.length != 0) {
            occupiedStartTime = Date.parse(result1[0].date + ' ' + result1[0].occupied_time_start)
            occupiedEndTime = Date.parse(result1[0].date + ' ' + result1[0].occupied_time_end)
            // console.log(parsedStartTime)
            // console.log(occupiedStartTime)
            // console.log(occupiedEndTime)
            if (parsedStartTime < occupiedStartTime || parsedStartTime > occupiedEndTime)
                bool = true
        }
        if (!flag) {
            return res.status(403).json({
                message: 'Schedule mismatch',
                data: 'You have other schedules lined up at this time period'
            })
        }
        else if (bool || result1.length == 0) {
            result = await models.ScheduleInfo.create({
                description: description,
                client_id: userId,
                provider_id: providerId,
                date: date,
                start_time: startTime,
                end_time: endTime
            }, {
                logging: false
            })
            return res.status(200).json({
                message: 'OK',
                data: 'Available'
            })
        } else {
            return res.status(403).json({
                message: 'Unavailable',
                data: 'Provider isn\'t free'
            })
        }
    } catch (ex) {
        console.log(ex)
        return res.sendStatus(404)
    }
}

const viewSchedules = async (req, res) => {
    let clientId = req.body.user_id
    try {
        let result = await models.ScheduleInfo.findAll({
            where: {
                client_id: {
                    [Op.eq]: clientId
                }
            },
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

module.exports = { bookSchedule, viewSchedules }