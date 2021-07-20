require('dotenv').config();

const awsConfig = {
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  accessKeyId: process.env.ACCESS_KEY_ID_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
};

module.exports = awsConfig;