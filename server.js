// Description: This file is the entry point of the application
const express = require("express");
const routes = require("./network/routes");

require("dotenv").config();

let port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



routes(app);

app.use('/app', express.static('public'));	

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
