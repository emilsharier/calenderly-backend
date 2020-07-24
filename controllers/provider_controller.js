const models = require('../models/models')
const { Op } = require('sequelize')

const changeProviderOccupiedTime = async (req, res) => {
    const startTime = req.body.start_time
    const endTime = req.body.end_time
    const date = req.body.date
    const providerId = req.body.provider_id

    try {
        let result = await models.ProviderOccupiedTime.findAndCountAll({
            where: {
                date: {
                    [Op.eq]: date
                },
                provider_id: {
                    [Op.eq]: providerId
                }
            }
        })
        let result2
        if (result.count == 0) {
            result2 = await models.ProviderOccupiedTime.create({
                provider_id: providerId,
                date: date,
                occupied_time_start: startTime,
                occupied_time_end: endTime
            })
        } else {
            result2 = await models.ProviderOccupiedTime.update({
                occupied_time_start: startTime,
                occupied_time_end: endTime
            }, {
                where: {
                    date: {
                        [Op.eq]: date
                    },
                    provider_id: {
                        [Op.eq]: providerId
                    }
                }
            })
        }
        if (result2) {
            return res.status(200).json({
                message: 'OK'
            })
        } else {
            return res.status(403).json({
                message: 'Forbidden'
            })
        }
    } catch (ex) {
        console.log(ex)
        return res.sendStatus(404)
    }
}

module.exports = { changeProviderOccupiedTime }