/* FOLLOWING ARE DRAFTS: REQUESTS ARE TO BE DEFINED IN INDEX.JS WHEN IMPLEMENTED */

    /* POST request for signing in a user and verifying if credentials are in database */
router.post('/login', function(req,res,next) {
    /* check if username and password are in body */
    console.log(req.body)
    if ('username' in req.body && 'password' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        /* query */
        let query = "SELECT username,firstName,lastName,email,phoneNum FROM users WHERE username = ? AND password = SHA2(?,224);";
        connection.query(query,[req.body.username,req.body.password], function(error,rows,fields) {
            connection.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            console.log(rows);
            if (rows.length > 0) {
                req.session.user = rows[0]; /* setting session */
                res.json(rows); /* sending back details */
            }
            else {
                res.sendStatus(401); /* bad login */
            }
        });
      });
    } else {
        res.sendStatus(400); /* bad request */
    }
  });
  
    /* POST request for signing up a user */
router.post('/signup', function(req,res,next) {
    /* check if all necessary details are in body */
    if ('username' in req.body && 'password' in req.body && 'firstName' in req.body && 'lastName' in req.body && 'email' in req.body && 'phoneNum' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        /* first query (adding user to database) */
        let query = "INSERT INTO users (username,password,firstName,lastName,email,phoneNum) VALUES(?,SHA2(?,224),?,?,?,?)";
        connection.query(query,[req.body.username,req.body.password,req.body.firstName,req.body.lastName,req.body.email,req.body.phoneNum], function(error,rows,fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            /* second query (verifying user is in database, confirming sign up) */
            let query = "SELECT username,firstName,lastName,email,phoneNum FROM users WHERE username = ? AND password = SHA2(?,224);";
            connection.query(query,[req.body.username,req.body.password], function(error,rows,fields) {
                connection.release(); /* release connection */
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                if (rows.length > 0) {
                    req.session.user = rows[0]; /* setting session */
                    res.json(rows); /* sending back details */
                }
                else {
                    res.sendStatus(401); /* unsuccessful */
                }
            });
        });
      });
    } else {
        res.sendStatus(400); /* bad request */
    }
  });

    /* JAVASCRIPT: POST request for making a user an admin */
router.post('/makeAdmin', function(req,res,next) {
    /* check if username is in body */
    if ('username' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        /* query */
        let query = "INSERT INTO administrators(user) VALUES(?);";
        connection.query(query,[req.body.username], function(error,rows,fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            /* second query (verifying admin is in database, confirming addition) */
            let query = `SELECT user,admin_id
                            FROM administrators
                            WHERE user = ?;`;
            connection.query(query,[req.body.username], function(error,rows,fields) {
                connection.release(); /* release connection */
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                if (rows.length > 0) {
                    res.sendStatus(200); /* successful */
                }
                else {
                    res.sendStatus(401); /* unsuccessful */
                }
            });
        });
      });
    } else {
        res.sendStatus(400); /* bad request */
    }
  });

  /* POST request for checking if user is admin */
router.post('/checkAdmin', function(req,res,next) {
    /* check if user is in body */
    if ('username' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        /* query */
        let query = `SELECT user,admin_id
                        FROM administrators
                        WHERE user = ?;`;
        connection.query(query,[req.body.username], function(error,rows,fields) {
            connection.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                res.sendStatus(200); /* successful */
            }
            else {
                res.sendStatus(401); /* unsuccessful*/
            }
        });
      });
    } else {
        res.sendStatus(400); /* bad request */
    }
  });