const {
  MethodAvailabilityError,
  ServerError,
} = require('../../data/api/http_error_handler/httpErrors');

/**
 * Error function used when request path does not exist in the API
 * @function routeNotFound
 * @returns Response object Error 
 */
function routeNotFound(req, _res, next) {
  const error = new MethodAvailabilityError(
    null,
    req.method + " request from " + req.ip + " to url " + req.originalUrl
  );
  return next(error);
}

/**
 * Function to manage the errors in API
 * @function errorHandler
 */
function errorHandler(err, req, res, _next) {
  let error;
  if (err.getReadableObject === undefined) {
    error = new ServerError(null, err.message);
  } else {
    error = err;
  }
  let jsonError = error.getReadableObject();
  if (!req.logger) {
    // logger.error(jsonError);
  } else {
    req.logger.error(jsonError, error.message);
  }
  jsonError.process_id = req.id;
  if (!res.headersSent) {
    res.status(error.statusCode).send(jsonError);
  }
}

/**
 * Exporting error modules (routeNotFound errorHandler) to be user in the app configuration
 * @module GeneralErrors 
 */
 module.exports = { routeNotFound, errorHandler};