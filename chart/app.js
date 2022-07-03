'use strict';

const path = require('path');
const createError = require('http-errors');
const express = require('express');
const indexRouter = require('./routes/index');
const app = express();
const ip = require('ip')
const setting = require('./appsettings.json')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

const port = setting.port;

app.listen(port, () => {
    console.log(`Starting server on port ${port}!`);
    console.log(`http://${ip.address()}:${port}/`);
});