var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Cros request allow lib load
var cors = require('cors')

// Connect mongo database
const mongoConnect = require('./db/connect')
mongoConnect()

// load express graphql
const {graphqlHTTP} = require('express-graphql') 
const schema = require('./schema/schema')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// Use Cros request allow lib
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

module.exports = app;
