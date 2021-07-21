const AWS = require("aws-sdk");
const table = "User2";
const logger = require('../../../utils/logger');
const bcrypt = require("bcrypt");

const InsertUserI = async (data) => {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  data.password = await bcrypt.hash(data.password, salt);
  let item = AWS.DynamoDB.Converter.marshall(data)
  return {
    TableName: table,
    Item: item
  }
};

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

const UpdateUserI = (data) => {

  function buildExpressionNames (obj) {
    let keys = Object.keys(obj);
    let attNames = {};
    for (i = 0; i < keys.length; i++) {
      let expatt = String.fromCharCode(65+i);
      attNames[`#${expatt}`] = `${keys[i]}`;
    }
    return attNames;
  };
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
    // Convert the attribute JavaScript object you are deleting to the required DynamoDB format
    ExpressionAttributeValues: AWS.DynamoDB.Converter.marshall(buildAtributesExpression(data)),
    ExpressionAttributeNames: buildExpressionNames(data)
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
    TableName : table,
    KeyConditionExpression   : "userid = :v ",
    ExpressionAttributeValues: {
      ":v": {N: data}
  }
}; 
  return params
};

module.exports =  { InsertUserI, DeleteUserI, UpdateUserI, FindAllUserI, FindUserI };