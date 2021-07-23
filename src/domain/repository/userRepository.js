var AWS = require('aws-sdk');
const clientDB = require('../../data/db/dynamoDBConnection');
const logger = require('../../utils/logger');
const getValidDDBObject = require('../../utils/validddbobj');
const bcrypt = require("bcrypt");

/**
 * Exporting the create user repository, used to create an user into the database
 * @async
 * @function createUsr
 * @param {object} params dynamoDb params
 * @returns {Array} [0] represents a boolean to verify if the user has been created
 */
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

/**
 * Exporting the update user repository, used to update an user into the database
 * @async
 * @function updateUsr
 * @param {object} params dynamoDb params
 * @returns {Array} [0] represents a boolean to verify if the user has been updated
 */
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

/**
 * Exporting the get all user repository, used to get the users from the database
 * @async
 * @function getAllUsrs
 * @param {object} params dynamoDb params
 * @returns {Array} [0] represents a boolean to verify if the user has been extracted from the database, [1] represents the users
 */
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
  /**Checking if exist users in the response object */
  try {
    validObject = getValidDDBObject(data.Items)
  } catch (error){
    logger.info('Warning - there is no user');
    return [true, undefined]
  }
  /** deleting the password from each user in the response */
  for (i=0; i < validObject.length; i++) {
    let item = AWS.DynamoDB.Converter.unmarshall(validObject[i]);
    delete item.password;
    items[`${i+1}`] = item;
  }
  logger.info('Success - found all users');
  return [true, items];
};

/**
 * Exporting the delete user repository, used to delete an user from the database
 * @async
 * @function deleteUsr
 * @param {object} params dynamoDb params
 * @returns {Array} [0] represents a boolean to verify if the user has been deleted
 */
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

/**
 * Exporting the get user by id repository, used to get an user from the database
 * @async
 * @function getUserById
 * @param {object} params dynamoDb params
 * @returns {Array} [0] represents a boolean to verify if the user has been extracted from the database, [1] represents an user
 */
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

/**
 * Exporting the basic authentication repository, used to perform a validation before to do some action 
 * @async
 * @function basicAuth
 * @param {object} params dynamoDb params
 * @param {string} username email
 * @param {string} password user pwd
 * @returns {Array} [0] represents a boolean to verify if the credentials are right, [1] represents the users
 */
exports.basicAuth = async (params, username, password) => {
  /** This function checks if the username[email] exist into the database
   * @function checkExist
   * @param {object} validObject dynamoDB object
   * @returns {object} represents the user
  */
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
  /**Cheking if the hash password for user in database is equal to the provided password  */
  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword) {
    return [false, undefined];
  }
  delete user.password;
  logger.info('Success - auth ok');
  return [true, user];
}