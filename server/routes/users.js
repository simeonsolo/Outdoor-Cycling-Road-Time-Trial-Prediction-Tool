var express = require('express');
var router = express.Router();

// POST method for signing up users
router.post('/signup', function(req, res){
    var username = req.body.username;
    var first = req.body.first;
    var last = req.body.last;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;

    req.pool.getConnection( function(err,connection) {
        if (err) {
            res.sendStatus(502);
        return;
        }

        // Search for username in DB, if already there return 418, else continue on
        // This probably could be refactored
        var query = "SELECT username FROM users WHERE username = ?;";
        connection.query(query, [username], function(err, rows, fields) {
        connection.release(); // release connection
            if (err) {
                res.sendStatus(520);
                return;
            }
            if(rows.length > 0) {
                res.sendStatus(418);
                return;
            }
        });
   });

    req.pool.getConnection( function(err,connection) {
        if (err) {
            res.sendStatus(502);
        return;
        }

        var query = "INSERT INTO Users (username, password, firstName, lastName, email, phoneNum) VALUES(?, SHA2(?, 244), ?, ?, ?, ?) SELECT LAST_INSERT_ID() AS UserId;";
        connection.query(query, [username, pass, first, last, email, phone], function(err, rows, fields) {
        connection.release(); // release connection
            if (err) {
                res.sendStatus(520);
                return;
            }
            req.session.user = rows[1][0].UserId;
            res.status(200).send((req.session.user).toString());
        });
   });
});

// POST method for logging in users
router.post('/login', function(req, res, next) {
    if( 'username' in req.body ){
        var username = req.body.username;
        var pass = req.body.password;
  
          //Connect to the database
          req.pool.getConnection( function(err,connection) {
              if (err) {
                  res.sendStatus(500);
              return;
              }
          var query = "SELECT username, firstName, lastName, email, phoneNum FROM users WHERE username = ? AND password  = SHA2(?, 244);";
          connection.query(query, [username, pass], function(err, rows, fields) {
              connection.release(); // release connection
                  if (err) {
                      res.sendStatus(500);
                      return;
                  }
                  if(rows.length != 1){
                      res.sendStatus(401);
                  }else{
                      req.session.user = rows[0].UserID;  
                      res.status(200).send((req.session.user).toString());
                  }
              });
          });
      }else {
        res.sendStatus(401);
    }
  });

  module.exports = router;