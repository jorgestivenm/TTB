const { createLogger, transports, format } = require('winston');
/**Define a prettyJson format to use it into the logger */
const prettyJson = format.printf(info => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.level}: ${info.message}`;
})

/**Definig a Logger object to implemet logs in the APP */
const logger = createLogger({
  format: format.combine(
    format.prettyPrint(),
    prettyJson,
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
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

/**
 * Exporting the logger object to use it in other site
 * @module looger
 */
module.exports = logger;