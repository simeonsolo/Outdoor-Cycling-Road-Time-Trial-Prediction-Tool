const express = require("express");
var debug = require("debug")("test:server");
var http = require("http");
var createError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const jwt = require("express-jwt");
// const jwksRsa = require("jwks-rsa");
// const session = require("express-session");
const logger = require("morgan");
const mysql = require("mysql");

// Routers declaration
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// MySQL Database connection pool
var dbConnectionPool = mysql.createPool({
  host: "localhost",
  database: "CYCOUT10",
  user: "bothn",
  password: "A1!",
  multipleStatements: true,
  socketPath: '/var/run/mysqld/mysqld.sock',
});

// Initialize the app
const app = express();

// View engine setup in Jade
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middlewares
// Form Data middleware
app.use(function (req, res, next) {
  req.pool = dbConnectionPool;
  next();
});

// Json Body middleware
app.use(bodyParser.json());
// Cors middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

// Seting up the static directory
app.use(express.static(path.join(__dirname, "dist")));

// // Cookie setup
// app.use(
//   session({
//     secret: "szxdcfvgbhjnmkkjhgffghi",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

// Security
// // Create middleware to validate the JWT using express-jwt
// const checkJwt = jwt({
//   // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
//   }),

//   // Validate the audience (Identifier) and the issuer (Domain).
//   audience: authConfig.audience,
//   issuer: `https://${authConfig.domain}/`,
//   algorithms: ["RS256"]
// });

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

var debug = require("debug")("test:server");
var http = require("http");

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || "8000");
app.set("port", port);

// Create HTTP server.
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
