const express = require("express");
const app = express();

const controller = require("./controller");
const response = require("../../network/response");


app.post("/", async (req, res) => {
    try {
      let token = await controller.getAuth(req.body);
      response.success(req, res, token, 200);
    } catch (error) {
      if (error === 400) {
        response.error(req, res, "Invalid information", 400, error);
        return;
      }
      response.error(req, res, "Unexpected Error", 500, error);
    }
  });


module.exports = app;
