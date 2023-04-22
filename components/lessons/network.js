const express = require("express");
const app = express();

const controller = require("./controller");
const response = require("../../network/response");

app.get ("/", async (req, res) => {
    try {
        let lessons = await controller.getLessons();
        response.success(req, res, lessons, 200);
    } catch (error) {
        response.error(req, res, "Unexpected Error", 500, error);
    }
});
app.get ("/:id", async (req, res) => {
    try {
        let lesson = await controller.getLesson(req.params.id);
        response.success(req, res, lesson, 200);
    } catch (error) {
        response.error(req, res, "Unexpected Error", 500, error);
    }
});

app.post ("/", async (req, res) => {
    try {
        let newLesson = await controller.addLesson(req.body);
        response.success(req, res, newLesson, 201);
    } catch (error) {
        if (error === 400) {
            response.error(req, res, "Invalid information", 400, error);
            return;
        }
        response.error(req, res, "Unexpected Error", 500, error);
    }
});

module.exports = app;
