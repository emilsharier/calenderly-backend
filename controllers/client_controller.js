const models = require('../models/models')
const { Op } = require('sequelize')

const bookSchedule = async (req, res) => {
    const date = req.body.date
    const description = req.body.description.trim()
    const userId = req.body.user_id
    const providerId = req.body.provider_id

    const startTime = req.body.start_time
    const endTime = req.body.end_time

    const parsedStartTime = Date.parse(date + ' ' + req.body.start_time)
    
    try {
        let result = await models.ProviderOccupiedTime.findAll({
            where: {
                date: {
                    [Op.eq]: date
                },
                provider_id: {
                    [Op.eq]: provider_id
                }
            },
            logging: false
        })
        let occupiedStartTime = Date.parse(result[0].date + ' ' + result[0 ].occupied_time_start)
        if (parsedStartTime < occupiedStartTime) {
            result = await models.ScheduleInfo.create({
                description: description,
                user_id: userId,
                provider_id: providerId,
                date: date,
                start_time: startTime,
                end_time: endTime 
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

module.exports = { bookSchedule }