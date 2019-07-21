require("dotenv").config();
require("./services/db");


const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  //Request headers
  res.setHeader(
    "Access-control-Allow-Headers",
    "Content-Type, Access-control-Allow-Headers, Authorization"
  );

  next();
});

const PORT = process.env.PORT || 3000;

const routes = require("./api/routes/router");
app.use("/api", routes);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

module.exports = app;
