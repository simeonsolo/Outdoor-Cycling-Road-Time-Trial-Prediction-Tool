var express = require('express');
var router = express.Router();

// Most of this is only from WDC project, but I assume the format would be similar? 
// Really depends on how the express-jwt module works
// This will need to be edited once the database is formed.
router.post('/signup', function(req, res){
    var given = req.body.given;
    var family = req.body.family;
    var email = req.body.email;
    var pass = req.body.password;

    req.pool.getConnection( function(err,connection) {
        if (err) {
            res.sendStatus(502);
        return;
        }

        var query = "INSERT INTO Users (GivenName, FamilyName, Email, Password) VALUES (0,?,?,?,AES_ENCRYPT(?,'key')); SELECT LAST_INSERT_ID() AS UserId;";
        connection.query(query, [given, family, email, pass], function(err, rows, fields) {
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

router.post('/login', function(req, res, next) {
    if( 'email' in req.body ){
        var email = req.body.email;
        var pass = req.body.password;
  
          //Connect to the database
          req.pool.getConnection( function(err,connection) {
              if (err) {
                  res.sendStatus(500);
              return;
              }
          var query = "SELECT UserID FROM Users WHERE Email = ? AND Password = AES_ENCRYPT(?,'key')";
          connection.query(query, [email, pass], function(err, rows, fields) {
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