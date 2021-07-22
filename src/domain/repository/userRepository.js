var AWS = require('aws-sdk');
const clientDB = require('../../data/db/dynamoDBConnection');
const logger = require('../../utils/logger');
const getValidDDBObject = require('../../utils/validddbobj');
const bcrypt = require("bcrypt");

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
    let item = AWS.DynamoDB.Converter.unmarshall(validObject[i]);
    delete item.password;
    items[`${i+1}`] = item;
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
    data = await clientDB.query(params).promise();    
  } catch (err) {
    logger.error('Error', err);
    return [false, null]
  }

  let validObject;
  let item;
  try {
    validObject = getValidDDBObject(data.Items)
    item = AWS.DynamoDB.Converter.unmarshall(validObject[0]);
  } catch (error){
    logger.info('Warning - there is no user');
    return [true, undefined]
  }
  
  if(Object.keys(item).length === 0 && item.constructor === Object) return [true, undefined]

  delete item.password;
  logger.info('Success - User found');
  return [true, item];
}; 

exports.basicAuth = async (params, username, password) => {

  function checkExist(validObject) {
    let user;
    for (i=0; i < validObject.length; i++) {
      let item = AWS.DynamoDB.Converter.unmarshall(validObject[i]);
      if (item.email == username){
        user =  item;
      }
    }
    if (!user) return false;
    return user;
   };

  let data;
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
 
  let user = checkExist(validObject);
  if (!user) return [false, undefined];

  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword) {
    return [false, undefined];
  }
  delete user.password;
  logger.info('Success - auth ok');
  return [true, user];
}