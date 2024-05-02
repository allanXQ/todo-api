const logger = require("./logger");
const errorHOC = require("./errorHOC");
const {
  clearTokens,
  generateTokens,
  setCookies,
} = require("./authUtils/cookie");

module.exports = {
  logger,
  errorHOC,
  clearTokens,
  generateTokens,
  setCookies,
};
