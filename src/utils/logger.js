const winston = require("winston");

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    ),
    winston.format.colorize()
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/error.json",
      level: "error",
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.json" }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

module.exports = logger;
