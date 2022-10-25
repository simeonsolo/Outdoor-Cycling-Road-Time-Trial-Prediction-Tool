var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("User route work!");
});

router.post("/storeRaceInput", function(req,res,next) {
  /* connect to database */
  req.pool.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
    /* query */
    let query =
      "INSERT INTO races (raceName,courseName,massTotal,criticalPower,energyReserve,recoveryFunction,CDA12,CDA14,CDA16,climbingPosition,descendingPosition,tyreCrr,mechanicalEfficiency,wheelRadius,Dt,V0,windDirection,windSpeed,airDensity,steadyStatePowerInputPercentage,overThresholdPowerInputPercentage,descendPowerInputPercentage,slopeThresholdBelowSteadyStatePower,slopeThresholdAboveSteadyStatePower,slopeThresholdBelowDescendingPosition,slopeThresholdAboveDescendingPosition,deltaCDA,deltaWatts,deltaKG) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(
      query,
      [req.body.raceName, req.body.courseName,req.body.massTotal,req.body.criticalPower,req.body.energyReserve,req.body.recoveryFunction,req.body.CDA12,req.body.CDA14,req.body.CDA16,req.body.climbingPosition,req.body.descendingPosition,req.body.tyreCrr,req.body.mechanicalEfficiency,req.body.wheelRadius,req.body.Dt,req.body.V0,req.body.windDirection,req.body.windSpeed,req.body.airDensity,req.body.steadyStatePowerInputPercentage,req.body.overThresholdPowerInputPercentage,req.body.descendPowerInputPercentage,req.body.slopeThresholdBelowSteadyStatePower,req.body.slopeThresholdAboveSteadyStatePower,req.body.slopeThresholdBelowDescendingPosition,req.body.slopeThresholdAboveDescendingPosition,req.body.deltaCDA,req.body.deltaWatts,req.body.deltaKG],
      function (error, rows, fields) {
        if (error) {
          res.sendStatus(500);
          return;
        }
        /* second query */
          let query =
          "SELECT * FROM races WHERE raceName = ?";
        connection.query(query,[req.body.raceName], function (error, rows, fields) {
            connection.release(); /* release connection */
            if (error) {
              res.sendStatus(500);
              return;
            }
            if (rows.length > 0) {
              res.send(rows[0]);
            } else {
              res.sendStatus(401); // does not exist
            }
          }
        );
      }
    );
  });
});

/* POST request signing in user */
/* Receives JSON object that contains username & password */
router.post("/login", function (req, res, next) {
  /* check if username and password are in body */
  if ("username" in req.body && "password" in req.body) {
    /* connect to database */
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      /* query */
      let query =
        "SELECT username,firstName,lastName,email,phoneNum FROM users WHERE username = ? AND password = SHA2(?,224);";
      connection.query(
        query,
        [req.body.username, req.body.password],
        function (error, rows, fields) {
          connection.release(); /* release connection */
          if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
          }
          if (rows.length > 0) {
            req.session.user = rows[0]; /* setting session */
            res.json(rows[0]); /* sending back user details */
          } else {
            res.sendStatus(401); /* bad login */
          }
        }
      );
    });
  } else {
    res.sendStatus(400); /* bad request */
  }
});

/* POST request for signing up a user */
/* Receives JSON object that contains username,password,firstName,lastName,email,phoneNum */
router.post("/signup", function (req, res, next) {
  /* check if all necessary details are in body */
  if (
    "username" in req.body &&
    "password" in req.body &&
    "firstName" in req.body &&
    "lastName" in req.body &&
    "email" in req.body &&
    "phoneNum" in req.body
  ) {
    /* connect to database */
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      /* first query (adding user to database) */
      let query =
        "INSERT INTO users (username,password,firstName,lastName,email,phoneNum) VALUES(?,SHA2(?,224),?,?,?,?)";
      connection.query(
        query,
        [
          req.body.username,
          req.body.password,
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.phoneNum,
        ],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(500);
            connection.release(); /* release connection */
            return;
          }
          /* second query (signing in user) */
          let query =
            "SELECT username,firstName,lastName,email,phoneNum FROM users WHERE username = ? AND password = SHA2(?,224);";
          connection.query(
            query,
            [req.body.username, req.body.password],
            function (error, rows, fields) {
              connection.release(); /* release connection */
              if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
              }
              if (rows.length > 0) {
                res.sendStatus(200);
              } else {
                res.sendStatus(401); /* unsuccessful */
              }
            }
          );
        }
      );
    });
  } else {
    res.sendStatus(400); /* bad request */
  }
});

router.use(function(req, res, next) {
  if('user' in req.session){
      next();
  } else {
      res.sendStatus(401);
  }
});

/* GET request for logging out */
router.get('/logout', function(req, res) {
  req.session.destroy();
  res.sendStatus(200);
});

/* POST request for updating a users password */
router.post("/updatePassword", function (req, res, next) {
  user = req.session.user
  if (
    "password" in req.body &&
    "newPassword" in req.body
  ) {
    /* connect to database */
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      /* first query to check user info is correct */
      let query = `SELECT * from users WHERE username = ? AND password = SHA2(?,224);`
      connection.query(
        query,
        [user.username, req.body.password],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(500);
            connection.release(); /* release connection */
            return;
          }else if(rows.length <= 0){
            res.sendStatus(404);
            connection.release(); /* release connection */
            return;
          }else{
            /* second query (update the users password) */
            query = `UPDATE users 
            SET password = SHA2(?,224) 
            WHERE username = ? AND password = SHA2(?,224);`;
            connection.query(
              query,
              [req.body.newPassword, user.username, req.body.password],
              function (error, rows, fields) {
                connection.release(); /* release connection */
                if (error) {
                  console.log(error);
                  res.sendStatus(500);
                  return;
                }else{
                  res.sendStatus(200);
                }
              }
            );
          }
        });
      
    });
  } else {
    res.sendStatus(400); /* bad request */
  }
});

/* POST request for updating a users contact details */
router.post("/updateContactDetails", function (req, res, next) {
  user = req.session.user
  if (
    "email" in req.body &&
    "phoneNum" in req.body
  ) {
    /* connect to database */
    req.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      /* first query (update the users password) */
      let query = `UPDATE users
                SET email = ?,
                    phoneNum = ?
                WHERE username = ?;`;
      connection.query(
        query,
        [req.body.email, req.body.phoneNum, user.username],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(500);
            connection.release(); /* release connection */
            return;
          }
          /* second query (verifying user is in database, confirming sign up) */
          let query = `SELECT username,firstName,lastName,email,phoneNum 
                        FROM users 
                        WHERE username = ?;`;
          connection.query(
            query,
            [user.username],
            function (error, rows, fields) {
              connection.release(); /* release connection */
              if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
              }
              if (rows.length > 0) {
                req.session.user = rows[0]; /* setting session */
                res.json(rows); /* sending back details */
              } else {
                res.sendStatus(401); /* unsuccessful */
              }
            }
          );
        }
      );
    });
  } else {
    res.sendStatus(400); /* bad request */
  }
});

module.exports = router;
