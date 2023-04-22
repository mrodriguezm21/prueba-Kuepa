const jwt = require('jsonwebtoken');
const config = require("../config");

const sign = (data) => {
  return jwt.sign(data, config.jwtSecret, {
    expiresIn: '1d',
  });
}

module.exports = {
    sign,
}