const { Op } = require('sequelize')

const models = require('../models/models')

const fetchAllProviders = async (req, res) => {
    try {
        let data = await models.User.findAll({
            where: {
                user_type: {
                    [Op.eq]: 1
                }
            },
            attributes: [
                'user_id', 'name', 'phone', 'email'
            ]
        })
        return res.status(200).json({
            message: 'OK',
            data: data
        })
    } catch (ex) {
        console.error(ex)
        return res.sendState(404)
    }
}

// const searchForProviders = async (req, res) => {
//     try {
//         let search = req.body.search
//         let result = await models.Provider.findAll({
//             include: [
//                 {
//                     model: models.User,
//                     attributes: ['name', 'phone', 'email'],
//                     where: {
//                         name: {
//                             [Op.like]: `%${search}%`
//                         }
//                     }
//                 }
//             ],
//             logging: false
//         })
//         return res.status(200).json({
//             message: 'OK',
//             data: result
//         })
//     } catch (ex) {
//         console.log(ex)
//         return res.sendStatus(404)
//     }
// }

const fetchLiveSchedules = async (req, res) => {
    try {
        const provider_id = req.body.user_id
        const date = req.body.date
        let result = await models.ScheduleInfo.findAll({
            attributes: ['schedule_id', 'description', 'client_id', 'date', 'start_time', 'end_time'],
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
        return res.status(200).json({
            message: 'OK',
            data: result
        })
    } catch(ex) {
        console.log(ex)
        return res.sendStatus(404)
    }
}

module.exports = { fetchAllProviders, fetchLiveSchedules }