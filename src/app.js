const express = require('express');
const httpLogger = require('./utils/httpLogger');
const app = express();
const router_api = require('./data/api/routes/router');
const cors = require('cors');
const {
  errorHandler,
  routeNotFound,
} = require('./domain/error_handler/errorHandler');

/** Setting express with http logger */
app.use(httpLogger);
/**Setting express to use JSON */
app.use(express.json());
/**Setting express to use urlencode */
app.use(
  express.urlencoded({
    extended: true,
    type: "application/x-www-form-urlencoded",
    inflate: false,
  })
);
/**Setting express to use CORS */
app.use(
  cors({
    // exposedHeaders: ['filename', 'userSettings', 'app-language'],
  })
);

/**Setting express with the exposed routes */
app.use('/api', router_api)
/**Setting express to manage erros */
app.use(routeNotFound);
app.use(errorHandler);

/**
 * Exporting the app module after adding the basic configuration 
 * @module app
 */
module.exports = app;