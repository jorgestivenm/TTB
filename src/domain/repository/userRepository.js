var AWS = require('aws-sdk')
const clientDB = require('../../data/db/dynamoDBConnection')
const logger = require('../../utils/logger')
const getValidDDBObject = require('../../utils/validddbobj')

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
  let item = AWS.DynamoDB.Converter.unmarshall(data)
  return [true, item];
};

exports.getAllUsrs = async (params) => {
  let data;
  let items = {};
  try {
    data = await clientDB.scan(params).promise();
    logger.info('Success - found all users');
  } catch (err) {
    logger.error('Error', err);
    return [false, null]
  }
  const itemsList = getValidDDBObject(data.Items);
  for (i=0; i < itemsList.length; i++) {
    items[`${i+1}`] = AWS.DynamoDB.Converter.unmarshall(itemsList[i]);
  }
  logger.info(items);
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

