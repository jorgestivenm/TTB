require('dotenv').config();

const awsConfig = {
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
};

module.exports = awsConfig;