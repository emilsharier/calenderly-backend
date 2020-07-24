module.exports = (app) => {
    app.use('/signin', require('./auth_routes/sign_in'))
    app.use('/signup', require('./auth_routes/sign_up'))
}