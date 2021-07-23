const morgan = require('morgan');
const logger = require('./logger');

logger.stream = {
  write: message => logger.info(message.substring(0, message.lastIndexOf('\n')))
};

/**
 * Exporting the object morgan to be able to add the http request into the log  file
 * @module morgan
 */
module.exports = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  { stream: logger.stream }
);