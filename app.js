const createError = require('http-errors');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
var productRouter=require('./routes/product');
var categoryRouter=require('./routes/category');
var app = express();
//set jquery
// 2. config 'mongoose' module
var mongoose = require('mongoose');
var uri = "mongodb+srv://cuongtmgch211198:3ZFAX0aVsgXd8rwI@createcluster.hsygpov.mongodb.net/Toy";
mongoose.set('strictQuery', true); //ignore mongoose warning
mongoose.connect(uri)
  .then(() => console.log('ok'))
  .catch((err) => console.log(err));
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use(cookieParser())
app.use('/users', userRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    // Set locals, only providing errors in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
