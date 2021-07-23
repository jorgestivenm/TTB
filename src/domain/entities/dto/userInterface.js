const AWS = require("aws-sdk");
const table = "User2";
const logger = require('../../../utils/logger');
const bcrypt = require("bcrypt");

/**
 * Function to create the params object to insert user into the dynamoDB
 * @async
 * @function InsertUserI
 * @param {object} data User data
 * @returns {object} DynamoDB parameters
 */
const InsertUserI = async (data) => {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  /**now we set user password to hashed password to store just the hash */
  data.password = await bcrypt.hash(data.password, salt);
  let item = AWS.DynamoDB.Converter.marshall(data)

  return {
    TableName: table,
    Item: item
  }
};

/**
 * Function to create the params object to delete user from the dynamoDB
 * @function DeleteUserI
 * @param {object} data User data
 * @returns {object} DynamoDB parameters
 */
const DeleteUserI = (data) => {
  key = {
    userid: data.userid,
    email: data.email,
  }
  return {
    Key: AWS.DynamoDB.Converter.marshall(key),
    TableName: table
  }
};
/**
 * Function to create the params object to update user into the dynamoDB.
 * Just is possible  to update the age and usename, email and userid will be used to perform the query 
 * @function UpdateUserI
 * @param {object} data User data
 * @returns {object} DynamoDB parameters
 */
const UpdateUserI = (data) => {
  /**
   * This function builds the ExpressionNames used in the dynamoDB params
   * @function buildExpressionNames
   * @param {object}} obj 
   * @returns {object} Segment of dynamoDB parameters
   */
  function buildExpressionNames (obj) {
    let keys = Object.keys(obj);
    let attNames = {};
    for (i = 0; i < keys.length; i++) {
      let expatt = String.fromCharCode(65+i);
      attNames[`#${expatt}`] = `${keys[i]}`;
    }
    return attNames;
  };
  
    /**
   * This function builds the query expression used in the dynamoDB params
   * @function buildExpression
   * @param {object}} obj 
   * @returns {object} Segment of dynamoDB parameters
   */
  function buildExpression (obj) {
    let keys = Object.keys(obj);
    let expstring = "set";
    
    for (i = 0; i < keys.length; i++) {
      let expatt = String.fromCharCode(97+i);
      let expatt2 = String.fromCharCode(65+i);
      expstring = expstring.concat(' ',`#${expatt2} = :${expatt}`);
      if (i != keys.length - 1) {
        expstring = expstring + ',';
      }
    }
    return expstring;
  };
  
    /**
   * This function builds the AttributesExpression used in the dynamoDB params
   * @function buildAtributesExpression
   * @param {object}} obj 
   * @returns {object} Segment of dynamoDB parameters
   */
  function buildAtributesExpression (obj ) {
    let values = Object.values(obj);
    let attValues = {};
    for (i = 0; i < values.length; i++) {
      let expatt = String.fromCharCode(97+i);
      attValues[`:${expatt}`] = values[i]
    }
    return attValues;
  };

  let uid = data.userid;
  let uemail = data.email;
  delete data.email;
  delete data.userid;

  return {
    TableName: table,
    Key: AWS.DynamoDB.Converter.marshall({
      userid: uid,
      email: uemail,
    }),
    // Define expressions for the new or updated attributes
    UpdateExpression: buildExpression(data),
    // Define expression values for the new updated attibutes
    ExpressionAttributeValues: AWS.DynamoDB.Converter.marshall(buildAtributesExpression(data)),
    // Define the expression names for the new updated attributes
    ExpressionAttributeNames: buildExpressionNames(data)
  }
};

/**
 * This function creates the params to get allusers in the database
 * @function FindAllUserI
 * @returns {object} DynamoDB parameters
 */
const FindAllUserI = () => {
  let params = {
    TableName: table,
  }; 
  return params
};

/**
 * Function to create the params object to get user by id from the dynamoDB.
 * @function FindUserI
 * @param {object} data User data
 * @returns {object} DynamoDB parameters
 */
const FindUserI = (data) => {
  
  let params = {
    TableName : table,
    KeyConditionExpression   : "userid = :v ",
    ExpressionAttributeValues: {
      ":v": {N: data}
  }
}; 
  return params
};

module.exports =  { InsertUserI, DeleteUserI, UpdateUserI, FindAllUserI, FindUserI };