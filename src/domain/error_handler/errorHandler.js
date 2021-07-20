const {
  MethodAvailabilityError,
  ServerError,
} = require('../../data/api/http_error_handler/httpErrors');

function routeNotFound(req, _res, next) {
  const error = new MethodAvailabilityError(
    null,
    req.method + " request from " + req.ip + " to url " + req.originalUrl
  );
  return next(error);
}

function errorHandler(err, req, res, _next) {
  let error;
  if (err.getReadableObject === undefined) {
    error = new ServerError(null, err.message);
  } else {
    error = err;
  }
  let jsonError = error.getReadableObject();
  if (!req.logger) {
    // serverLogger.logHttpError(jsonError);
  } else {
    req.logger.error(jsonError, error.message);
  }
  jsonError.process_id = req.id;
  if (!res.headersSent) {
    res.status(error.statusCode).send(jsonError);
  }
}
 module.exports = { routeNotFound, errorHandler}