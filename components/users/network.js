const express = require("express");
const app = express();

const controller = require("./controller");
const response = require("../../network/response");


app.get("/", async (req, res) => {
    try {
      let messages = await controller.getUsers();
      response.success(req, res, messages, 200);
    } catch (error) {
      response.error(req, res, "Unexpected Error", 500, error);
    }
  });

app.get("/:id", async (req, res) => {
    try {
      let message = await controller.getUser(req.params.id);
      response.success(req, res, message, 200);
    } catch (error) {
      if (error === 404) {
        response.error(req, res, "User not found", 404, error);
        return;
      }
      response.error(req, res, "Unexpected Error", 500, error);
    }
});

app.post("/", async (req, res) => {
    try {
      let newUser = await controller.addUser(req.body);
      response.success(req, res, newUser, 201);
    } catch (error) {
      if (error === 400) {
        response.error(req, res, "Invalid information", 400, error);
        return;
      }
      if (error === 409) {
        response.error(req, res, "User already exists", 409, error);
        return;
      }
      response.error(req, res, "Unexpected Error", 500, error);
    }
  });


module.exports = app;
