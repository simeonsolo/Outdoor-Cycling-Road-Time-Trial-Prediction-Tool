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

app.use(function(req, res, next) {
  req.pool = dbConnectionPool;
  next();
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

/* FUNCTION FOR LOGGING IN USER */
/* receives username & password as input */
function login(Username, Password) {
  /* obtain inputs */
  let user = {
      username: Username,
      password: Password,
  }
  /* send POST request */
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          /* login success */
          response = JSON.parse(this.responseText); /* returns JSON object of users details */
      }
      else if (this.readyState == 4 && this.status >= 400) {
          /* login fail */
          alert("Invalid username or password."); /* alert */
      }
  };
  xhttp.open("POST", "/login", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(user));
}

/* FUNCTION FOR SIGNING UP USER & SIGNING IN USER */
/* receives username,password,firstName,lastName,email,phoneNum as input */
function signup(Username,Password,FirstName,LastName,Email,Phone) {
  /* obtain inputs */
  let user = {
      username: Username,
      password: Password,
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      phoneNum: Phone,
  }
  /* send POST request */
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          /* signup success */
          response = JSON.parse(this.responseText); // returns JSON object of users details
      } else if (this.readyState == 4 && this.status >= 400) {
          /* signup fail */
          alert("Signup Unsuccessful"); // alert
      }
  };
  xhttp.open("POST", "/signup");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(user));
}

/* FUNCTION FOR MAKING USER ADMIN */
/* receives username as input */
function makeAdmin(Username) {
  /* obtain inputs */
  let administrator = {
      username: Username
  }
  /* send POST request */
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          /* success */
          alert("Administrator created");
      } else if (this.readyState == 4 && this.status >= 400) {
          /* fail */
          alert("Administrator creation failed");
      }
  };
  xhttp.open("POST", "/makeAdmin");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(administrator));
}

/* FUNCTION FOR CHECKING IF ADMIN IS USER */
/* receives username as input */
function checkAdmin(Username) {
  /* obtain inputs */
  let administrator = {
      username: Username
  }
  /* send POST request */
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          /* success */
          alert("User is administrator");
      } else if (this.readyState == 4 && this.status >= 400) {
          /* fail */
          alert("User is not administrator");
      }
  };
  xhttp.open("POST", "/checkAdmin");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(administrator));
}

/* FUNCTION FOR CHANGING A USERS PASSWORD */
/* receives new password, username and old passwordas input */
function updatePassword(NewPassword,Username,Password) {
    /* obtain inputs */
    let user = {
        newPassword: NewPassword,
        username: Username,
        password: Password
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            response = JSON.parse(this.responseText); // returns JSON object of users details
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Signup Unsuccessful"); // alert
        }
    };
    xhttp.open("POST", "/updatePassword");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

/* FUNCTION FOR CHANGING A USERS CONTACT DETAILS */
/* receives new username, new email and new phone number as input */
function updatePassword(Username,Email,PhoneNum) {
    /* obtain inputs */
    let user = {
        username: Username,
        email: Email,
        phoneNum: PhoneNum
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            response = JSON.parse(this.responseText); // returns JSON object of users details
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Signup Unsuccessful"); // alert
        }
    };
    xhttp.open("POST", "/updateContactDetails");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
} 