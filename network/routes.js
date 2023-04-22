// Description: This file contains the routes of the API

const messages = require("../components/messages/network");
const users = require("../components/users/network");

const routes = function (server) {
  const currentVersion = "/api/v1";
  server.use(`${currentVersion}/messages`, messages);
  server.use(`${currentVersion}/users`, users);
};

module.exports = routes;
