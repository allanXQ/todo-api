const rateLimit = require("express-rate-limit");
const { messages } = require("../config");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: messages.rateLimit,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
