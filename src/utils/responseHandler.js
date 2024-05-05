const sendResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    status: statusCode < 400 ? "success" : "error",
    message,
    data,
  });
};

const sendSuccess = (res, data, message = "Success") => {
  sendResponse(res, 200, data, message);
};

const sendBadRequest = (res, message = "Bad Request", type) => {
  sendResponse(res, 400, null, message, type || "BadRequest");
};

const sendServerError = (res, message = "Error") => {
  sendResponse(res, 500, null, message);
};

const sendNotFound = (res, message = "Not Found") => {
  sendResponse(res, 404, null, message);
};

const sendForbidden = (res, message = "Forbidden") => {
  sendResponse(res, 403, null, message);
};

const sendUnauthorized = (res, message = "Unauthorized") => {
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
