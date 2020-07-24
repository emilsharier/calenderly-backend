module.exports = (app) => {
    app.use('/signin', require('./auth_routes/sign_in'))
    app.use('/signup', require('./auth_routes/sign_up'))
    app.use('/fetchAllProviders', require('./fetch_routes/fetch_all_providers'))
    app.use('/searchForProviders', require('./fetch_routes/search_for_providers'))
    app.use('/changeProviderOccupiedTime', require('./provider_routes/change_occupied_time'))
}