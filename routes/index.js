module.exports = (app) => {
    app.use('/signin', require('./auth_routes/sign_in'))
    app.use('/signup', require('./auth_routes/sign_up'))
    app.use('/fetchAllProviders', require('./fetch_routes/fetch_all_providers'))
    app.use('/searchForProviders', require('./fetch_routes/search_for_providers'))
    app.use('/changeProviderOccupiedTime', require('./provider_routes/change_occupied_time'))
    app.use('/bookSchedule', require('./client_routes/book_schedule'))
    app.use('/viewSchedules', require('./client_routes/view_schedules'))
    app.use('/fetchLiveSchedules', require('./provider_routes/fetch_live_schedule'))
}