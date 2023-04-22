// Description: This file contains the routes of the API

const messages = require("../components/messages/network");
const users = require("../components/users/network");
const lessons = require("../components/lessons/network");
const auth = require("../components/auth/network");

const routes = function (server) {
  const currentVersion = "/api/v1";
  server.use(`${currentVersion}/messages`, messages);
  server.use(`${currentVersion}/users`, users);
  server.use(`${currentVersion}/lessons`, lessons);
  server.use(`${currentVersion}/auth`, auth);
};

module.exports = routes;
