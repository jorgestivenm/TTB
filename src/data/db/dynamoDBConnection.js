var AWS = require('aws-sdk');
const awsconfig = require('./dynamoDBConfig');

AWS.config.update(awsconfig);

var clientDB = new AWS.DynamoDB();

module.exports = clientDB;