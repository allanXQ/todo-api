const { clearTokens, logger } = require("../utils");
const { messages } = require("../config");
const {
  sendServerError,
  sendUnauthorized,
  sendBadRequest,
} = require("../utils");

const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    case "YupValidationError":
      logger.error(error.message, {
        metadata: error,
        stack: error.stack,
        name: error.name,
      });
      return sendBadRequest(res, error.message, error.name);
    case "TokenExpiredError":
      //check if route is logout then clear cookies
      const { path } = req.route;
      if (path === "/api/v1/auth/logout") {
        //this should not be an error
        clearTokens(res);
      }
      logger.error(error.message, {
        metadata: error,
        stack: error.stack,
        name: error.name,
      });
      return sendUnauthorized(res, messages.tokenExpired);

    case "RefreshTokenExpiredError":
      logger.error(error.message, {
        metadata: error,
        stack: error.stack,
        name: error.name,
      });
      return sendUnauthorized(res, messages.tokenExpired);

    default:
      logger.error(error.message, {
        metadata: error,
        stack: error.stack,
        name: error.name,
      });
      return sendServerError(res, messages.serverError);
  }
};

module.exports = errorHandler;
