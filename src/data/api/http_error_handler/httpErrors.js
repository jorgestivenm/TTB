/**
 * @class HttpError 
 * Defines the http error object
 */
class HttpError extends Error {
  #details;
  #fatal;
  #statusCode;
  /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} fatal defines if the error is fatal or not
   * @param {number} statusCode status code 
   */
  constructor(message, details, fatal, statusCode) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message =
      message ||
      "An unexpected error in the server has happened, please try later";
    this.details = details || this.message;
    this.fatal = fatal || false;
    this.statusCode = statusCode || 500;
  }
  /**
   * Creates a valid error object
   * @method getReadableObject
   * @returns {object} error object
   */
  getReadableObject() {
    const customErrJs = {
      message: this.message,
      details: this.details,
      statusCode: this.statusCode,
      fatal: this.fatal,
    };
    return customErrJs;
  }
}

/**
 * @class ProcessingRequestError 
 * BAD REQUEST: The server cannot or will not process the request due to an apparent client error
 */
class ProcessingRequestError extends HttpError {
    /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(message || "Bad Request", details || message, isFatal || false, 400);
  }
}

/**
 * @class AuthenticationError 
 */
class AuthenticationError extends HttpError {
    /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message || "User Authentication failed",
      details || message,
      isFatal || false,
      401
    );
  }
}

/**
 * @class AuthorizationError 
 * when the request was valid, but the server is refusing action because user does not have needed permissions
 */
class AuthorizationError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(message || "Forbidden", details || message, isFatal || false, 403);
  }
}
/**
 * @class NotFoundError
 * when the resource but may be does not exist 
 */
class NotFoundError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message || "Object or resource not found",
      details || message,
      isFatal || false,
      404
    );
  }
}

/**
 * @class ConflictError
 */
class ConflictError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message || "There is a conflict with the current state of this resource",
      details || message,
      isFatal || false,
      409
    );
  }
}

/**
 * @class FulfillPreconditionError
 */
class FulfillPreconditionError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message ||
        "The request does not fulfill one precondition for this operation",
      details || message,
      isFatal || false,
      412
    );
  }
}

/**
 * @class FileTypeError
 * when the type file is not supported
 */
class FileTypeError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message || "Unsupported file type",
      details || message,
      isFatal || false,
      415
    );
  }
}

/**
 * @class ProcessingEntityError
 * UNPROCESSABLE ENTITY: The request was well-formed but was unable to be followed due to semantic errors
 */
class ProcessingEntityError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message || "Unable to process the file or request due to semantic errors",
      details || message,
      isFatal || false,
      422
    );
  }
}

/**
 * @class RequestDependencyError
 * The request failed because it depended on another request and that request failed
 */
class RequestDependencyError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message ||
        "The request depended on another request and that request failed",
      details || message,
      isFatal || false,
      424
    );
  }
}

/**
 * @class ServerError
 * Generic server Exceptions
 */
class ServerError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message || "An unexpected error has ocurred in the server",
      details || message || "",
      isFatal || false,
      500
    );
  }
}

/**
 * @class DatabaseDaoError
 * Database Exceptions
 */
class DatabaseDaoError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message || "An error has ocurred with database server",
      details || message,
      isFatal || false,
      500
    );
  }
}

/**
 * @class MethodAvailabilityError
 */
class MethodAvailabilityError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message || "Request method either not recognized or not available",
      details || message || "",
      isFatal || false,
      501
    );
  }
}

/**
 * @class ServerAvailabilityError
 * SERVER UNAVAILABLE: The server is currently unavailable (because it is overloaded or down for maintenance).
 */ 
class ServerAvailabilityError extends HttpError {
   /**
   * @param {string} message error message
   * @param {string} details error details
   * @param {boolean} isFatal defines if the error is fatal or not
   */
  constructor(message, details = '', isFatal = false) {
    super(
      message ||
        "Server is currently unable to handle the request due to missed internet connection, overloading or maintenance",
      details || message,
      isFatal || false,
      503
    );
  }
}

/**
 * Exporting the HTTP Errors that could be used in the API methods
 * @module HttpErros
 */
module.exports = {ProcessingRequestError, NotFoundError, FileTypeError, RequestDependencyError,
  DatabaseDaoError,AuthenticationError, AuthorizationError, ConflictError,
  FulfillPreconditionError, ProcessingEntityError, ServerError,
  MethodAvailabilityError, ServerAvailabilityError};