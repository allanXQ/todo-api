const logger = require("./logger");
const errorHOC = require("./errorHOC");
const {
  clearTokens,
  generateTokens,
  setCookies,
} = require("./authUtils/cookie");
const responses = require("./responseHandler");

module.exports = {
  logger,
  errorHOC,
  clearTokens,
  generateTokens,
  setCookies,
  ...responses,
};
