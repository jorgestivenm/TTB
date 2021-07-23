var AWS = require('aws-sdk');
const awsconfig = require('./dynamoDBConfig');

AWS.config.update(awsconfig);

/** Creating the AWS dynamoDB client*/
var clientDB = new AWS.DynamoDB();

/**
 * Exporting the clientDB module to performe the database requests on dynamoDB
 * @module clientDB
 */
module.exports = clientDB;