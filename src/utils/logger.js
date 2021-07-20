const { createLogger, transports, format } = require('winston');

const prettyJson = format.printf(info => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4)
  }
  return `${info.level}: ${info.message}`
})

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    format.colorize(),
    format.prettyPrint(),
    format.splat(),
    format.simple(),
    prettyJson,
  ),
  transports: [
    new transports.File({
      filename: './logs/ttb.log',
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      colorize: true
    }),
  ],
  exitOnError: false
});

module.exports = logger;