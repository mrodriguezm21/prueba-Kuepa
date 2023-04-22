// Description: This file is the entry point of the application
const express = require("express");
const cors = require('cors');
const app = express();
const server = require("http").Server(app);



const config = require("./config");
require('dotenv').config()

const db = require('./db');
db(config.dbUrl);

const routes = require("./network/routes");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


routes(app);

// app.use('/app', express.static('public'));	

server.listen(config.port, () => {
  console.log(`Server is running on ${config.host}:${config.port}`);
});
