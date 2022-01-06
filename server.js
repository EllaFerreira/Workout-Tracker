require("dotenv").config();
const connection = require("./config/connection");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const compression = require('compression');
const routes = require("./controllers");
const path = require("path");

connection();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(compression());
app.use(routes);


app.listen(PORT, () => {
  console.log(`App listening on ${PORT}.`);
});
