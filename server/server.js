// Some copied code
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const port = 8000;
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const mysql = require('mysql');
const session = require('express-session');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

var dbConnectionPool = mysql.createPool({
  host: 'localhost',
  database: 'CYCOUT10',
  multipleStatements: true
});

app.use(session({
  secret: 'arlsiujfghasdk',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

// listen on the port
app.listen(port);
