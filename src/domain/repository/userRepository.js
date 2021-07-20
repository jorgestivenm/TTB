var AWS = require('aws-sdk');
const clientDB = require('../../data/db/dynamoDBConnection');
const logger = require('../../utils/logger');
const getValidDDBObject = require('../../utils/validddbobj');

exports.createUsr = async (params) => {
  try {
    await clientDB.putItem(params).promise();
    logger.info('Success - created');
  } catch (err) {
    logger.error("Error", err);
    return [false, null];
  }
  return [true, null];  
};

exports.updateUsr = async (params) => {
  try{
    await clientDB.updateItem(params).promise();
    logger.info('Success - updated');
  } catch (err) {
    logger.error("Error", err);
    return [false, null];
  }
  return [true, null];
};

exports.getAllUsrs = async (params) => {
  let data;
  let items = {};
  try {
    data = await clientDB.scan(params).promise();
  } catch (err) {
    logger.error('Error', err);
    return [false, null]
  }
  let validObject;
  try {
    validObject = getValidDDBObject(data.Items)
  } catch (error){
    logger.info('Warning - there is no user');
    return [true, undefined]
  }

  for (i=0; i < validObject.length; i++) {
    items[`${i+1}`] = AWS.DynamoDB.Converter.unmarshall(validObject[i]);
  }
  logger.info('Success - found all users');
  return [true, items];
};

exports.deleteUsr = async (params) => {
  try {
    await clientDB.deleteItem(params).promise();
    logger.info("Success - deleted");
  } catch (err) {
    logger.error("Error", err);
    return [false, null];
  }
  return [true, null];
};


exports.getUserById = async (params) => {
  let data;
  try {
    data = await clientDB.getItem(params).promise();    
  } catch (err) {
    logger.error('Error', err);
    return [false, null]
  }

  let validObject;
  try {
    validObject = getValidDDBObject(data.Item)
  } catch (error){
    logger.info('Warning - there is no user');
    return [true, undefined]
  }
  const item = AWS.DynamoDB.Converter.unmarshall(validObject);
  logger.info('Success - User found');
  return [true, item];
}; 