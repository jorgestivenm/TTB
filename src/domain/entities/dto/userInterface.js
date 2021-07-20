const AWS = require("aws-sdk");
const table = "Users";
const logger = require('../../../utils/logger');

const InsertUserI = (data) => {

  return {
    TableName: table,
    Item: AWS.DynamoDB.Converter.marshall(data),
  }
};

const DeleteUserI = (data) => {
  key = {
    userid: data
  }
  return {
    Key: AWS.DynamoDB.Converter.marshall(key),
    TableName: table
  }
};

const UpdateUserI = (data) => {

  function buildExpression (obj) {
    let keys = Object.keys(obj);
    let expstring = "set";
    
    for (i = 1; i < keys.length; i++) {
      let expatt = String.fromCharCode(96+i);
      expstring = expstring.concat(' ',`${keys[i]} = :${expatt}`);
      if (i != keys.length - 1) {
        expstring = expstring + ',';
      }
    }
    return expstring;
  };

  function buildAtributesExpression (obj ) {
    let values = Object.values(obj);
    let attValues = {};
    for (i = 1; i < values.length; i++) {
      let expatt = String.fromCharCode(96+i);
      attValues[`:${expatt}`] = values[i]
    }
    return attValues;
  };

  return {
    TableName: table,
    Key: AWS.DynamoDB.Converter.marshall({
      userid: data.userid,
    }),
    // Define expressions for the new or updated attributes
    UpdateExpression: buildExpression(data),
    // Convert the attribute JavaScript object you are deleting to the required DynamoDB format
    ExpressionAttributeValues: AWS.DynamoDB.Converter.marshall(buildAtributesExpression(data)),
  }
};

const FindAllUserI = () => {
  let params = {
    TableName: table,
  }; 
  return params
};

const FindUserI = (data) => {
  let params = {
    Key: AWS.DynamoDB.Converter.marshall({
      userid: data,
    }),
    TableName: table,
  }; 
  return params
};

module.exports =  { InsertUserI, DeleteUserI, UpdateUserI, FindAllUserI, FindUserI };