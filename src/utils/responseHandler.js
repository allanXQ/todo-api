const { messages } = require("../config");

const sendResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    status: statusCode < 400 ? messages.success : messages.error,
    message,
    data,
  });
};

const sendSuccess = (res, data, message = messages.requestSuccessful) => {
  sendResponse(res, 200, data, message);
};

const sendBadRequest = (res, message = messages.badRequest, type) => {
  sendResponse(res, 400, null, message, type || messages.badRequest);
};

const sendServerError = (res, message = messages.serverError) => {
  sendResponse(res, 500, null, message);
};

const sendNotFound = (res, message = messages.notFound) => {
  sendResponse(res, 404, null, message);
};

const sendForbidden = (res, message = messages.forbidden) => {
  sendResponse(res, 403, null, message);
};

const sendUnauthorized = (res, message = messages.unauthorized) => {
  sendResponse(res, 401, null, message);
};

const responses = {
  sendSuccess,
  sendBadRequest,
  sendServerError,
  sendNotFound,
  sendForbidden,
  sendUnauthorized,
};

module.exports = responses;
