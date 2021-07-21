const app = require('./app');
const logger = require('./utils/logger');
const PORT = 3000;

async function main(PORT) {
  await app.listen(PORT);
  logger.info(`Server listening on port ${PORT}`)

  logger.info("status OK!")
}

main(PORT);
