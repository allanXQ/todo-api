const { clearTokens, logger } = require("../utils");
const { messages } = require("../config");
const {
  sendServerError,
  sendUnauthorized,
  sendBadRequest,
} = require("../utils");

const errorHandler = (error, req, res, next) => {
  const logContext = {
    metadata: error,
    stack: error.stack,
    name: error.name,
    method: req.method,
    url: req.originalUrl,
    userId: req.userId || "Unauthenticated",
  };

  switch (error.name) {
    case "YupValidationError":
      logger.error(error.message, logContext);
      return sendBadRequest(res, error.message, error.name);
    case "TokenExpiredError":
      const { path } = req.route;
      if (path === "/api/v1/auth/logout") {
        clearTokens(res);
      }
      logger.error(error.message, logContext);
      return sendUnauthorized(res, messages.tokenExpired);
    case "RefreshTokenExpiredError":
      logger.error(error.message, logContext);
      return sendUnauthorized(res, messages.tokenExpired);
    case "SequelizeUniqueConstraintError":
      logger.error(error.message, logContext);
      return sendBadRequest(res, messages.recordExists);
    default:
      logger.error(error.message, logContext);
      return sendServerError(res, messages.serverError);
  }
};

module.exports = errorHandler;
