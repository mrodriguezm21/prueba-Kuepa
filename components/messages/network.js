const express = require("express");
const app = express();

const controller = require("./controller");
const response = require("../../network/response");

app.get("/", async (req, res) => {
  try {
    let messages = await controller.getMessages();
    response.success(req, res, messages, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", 500, error);
  }
});

app.get("/:id", async (req, res) => {
  try {
    let message = await controller.getMessage(req.params.id);
    response.success(req, res, message, 200);
  } catch (error) {
    if (error === 404) {
      response.error(req, res, "Message not found", 404, error);
      return;
    }
    response.error(req, res, "Unexpected Error", 500, error);
  }
});

app.post("/", async (req, res) => {
  try {
    let newMessage = await controller.addMessage(req.body);
    response.success(req, res, newMessage, 201);
  } catch (error) {
    if (error === 400) {
      response.error(req, res, "Invalid information", 400, error);
      return;
    }
    response.error(req, res, "Unexpected Error", 500, error);
  }
});

module.exports = app;