const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// catch 404 and forward to error handler
app.use((req, res, next) =>
{
	next(createError(404));
})

app.use((err, req, res, next) =>
{
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
})

module.exports = app

// A ORM precisa sincronizar a database em toda inicializacao
const database = require('./src/Models/Database')

database.connection.sync()
