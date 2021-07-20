const express = require('express');
const httpLogger = require('./utils/httpLogger');
const app = express();
const router_api = require('./data/api/routes/router');
const cors = require('cors');
const {
  errorHandler,
  routeNotFound,
} = require('./domain/error_handler/errorHandler');


app.use(httpLogger);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
    type: "application/x-www-form-urlencoded",
    inflate: false,
  })
);

app.use(
  cors({
    // exposedHeaders: ['filename', 'userSettings', 'app-language'],
  })
);

app.use('/api', router_api)

app.use(routeNotFound);
app.use(errorHandler);

module.exports = app;