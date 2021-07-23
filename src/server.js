const app = require('./app');
const logger = require('./utils/logger');
const PORT = 3000;

/**
 * APP Entry Point 
 * @async
 * @function main
 * @param {integer} PORT app port to expose the API
 */
async function main(PORT) {
  await app.listen(PORT);
  logger.info(`Server listening on port ${PORT}`);
}

main(PORT);
